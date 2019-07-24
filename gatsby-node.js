// @ts-check

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const write = require("write");
const WebpackNotifierPlugin = require("webpack-notifier");
const path = require("path");
const { introspectionQuery, graphql, printSchema } = require("gatsby/graphql");

/**
 * Update default Webpack configuration
 */
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    plugins: [
      new WebpackNotifierPlugin({
        skipFirstNotification: true,
      }),
    ],
    output: {
      publicPath: "/",
    },
    resolve: {
      // Enable absolute import paths
      modules: [path.resolve(__dirname, "src"), "node_modules"],
      alias: {
        "@src": path.resolve(__dirname, "src"),
      },
    },
  });
};

/**
 * Generate GraphQL schema.json file to be read by tslint
 * Thanks: https://gist.github.com/kkemple/6169e8dc16369b7c01ad7408fc7917a9
 */
exports.onPostBootstrap = async ({ store }) => {
  try {
    const { schema } = store.getState();
    const jsonSchema = await graphql(schema, introspectionQuery);
    const sdlSchema = printSchema(schema);

    write.sync("schema.json", JSON.stringify(jsonSchema.data), {});
    write.sync("schema.graphql", sdlSchema, {});

    console.log("\n\n[gatsby-plugin-extract-schema] Wrote schema\n"); // eslint-disable-line
  } catch (error) {
    console.error(
      "\n\n[gatsby-plugin-extract-schema] Failed to write schema: ",
      error,
      "\n"
    );
  }
};

exports.onCreateBabelConfig = ({ stage, actions }, pluginOptions) => {
  const ssr = stage === `build-html` || stage === `build-javascript`;

  actions.setBabelPlugin({
    name: `babel-plugin-styled-components`,
    stage,
    options: { ...pluginOptions, ssr },
  });
};

async function onCreateNode({
  node,
  actions,
  loadNodeContent,
  createNodeId,
  createContentDigest,
}) {
  const { createNode, createParentChildLink } = actions;

  // We only care about JSON content.
  if (node.internal.mediaType !== `application/json`) {
    return;
  }

  const content = await loadNodeContent(node);
  const parsedContent = JSON.parse(content);

  // if (!_.isPlainObject(parsedContent)) {
  //   return;
  // }

  const { items, ...feed } = parsedContent;
  const id = parsedContent.id
    ? parsedContent.id
    : createNodeId(`${node.id} >>> JSON`);

  feedFields = {
    title: `${feed.title}`,
    description: `${feed.description}`,
    url: feed.htmlurl,
  };
  const feedNode = {
    ...feedFields,
    id,
    children: [],
    parent: node.id,
    internal: {
      contentDigest: createContentDigest(feedFields),
      type: "feed",
    },
  };
  createNode(feedNode);
  // console.log({ node, feedNode });
  createParentChildLink({ parent: node, child: feedNode });
  if (!Array.isArray(items)) {
    return;
  }

  const filteredItems = items
    .map(item => {
      if (!item.pubDate) {
        return undefined;
      }
      try {
        return {
          ...item,
          pubDate: new Date(item.pubDate).toISOString(),
        };
      } catch (err) {
        // If this blog continues to error, we'll remove it
        console.error("REMOVE BLOG", feed.htmlurl);
        // this item will be filtered out
      }
      return undefined;
    })
    .filter(Boolean)
    .sort((a, b) => a.pubDate > b.pubDate);

  const itemsToAdd = [
    filteredItems.pop(),
    filteredItems.pop(),
    filteredItems.pop(),
  ];

  await Promise.all(
    itemsToAdd.map(async item => {
      try {
        if (
          !item ||
          !item.pubDate ||
          !item.title ||
          !item.link ||
          !item.contentSnippet
        ) {
          return;
        }

        const itemFields = {
          title: `${item.title}`,
          pubDate: new Date(item.pubDate).toISOString(),
          description: `${item.contentSnippet}`,
          folder: item.folder,
          link: item.link,
          guid: `${item.guid}`,
        };
        const itemNode = {
          ...itemFields,
          children: [],
          id: `${id}/${item.id || item.guid}`,
          parent: id,
          internal: {
            contentDigest: createContentDigest(itemFields),
            type: "feedItem",
          },
        };

        await createNode(itemNode);
        createParentChildLink({ parent: feedNode, child: itemNode });
      } catch {
        // If a post is badly formatted, we're ignoring it.
        return true;
      }
    })
  );
}

exports.onCreateNode = onCreateNode;
