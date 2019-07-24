import * as fs from "fs";
import * as path from "path";
import * as opmlToJSON from "opml-to-json";
import * as rimraf from "rimraf";

import * as Parser from "rss-parser";

import { OPML } from "./opml";

let parser = new Parser({
  headers: {
    Accept: "application/rss+xml",
    "User-Agent": "goodengineering.dev",
  },
});

async function Process({ source, output }: { source: string; output: string }) {
  const opmlRaw = fs.readFileSync(path.join(__dirname, source));

  const opml: OPML = await new Promise((resolve, reject) =>
    opmlToJSON(opmlRaw, (err, json) => {
      if (err) {
        reject(err);
      }
      resolve(json);
    })
  );

  if (!opml.children) {
    return;
  }

  rimraf.sync(path.join(__dirname, output));

  await Promise.all(
    opml.children
      .map(
        folder =>
          folder.children &&
          folder.children.map(async feed => {
            try {
              const url = new URL(feed.htmlurl);

              const items = await parser.parseURL(feed.xmlurl);

              await fs.mkdirSync(path.join(__dirname, output, url.hostname), {
                recursive: true,
              });

              await fs.writeFileSync(
                path.join(__dirname, output, url.hostname, "feed.json"),
                JSON.stringify({ ...feed, ...items }, null, 2),
                { encoding: "utf8" }
              );
              return true;
            } catch (err) {
              console.error(err);
              // If this blog continues to error, we'll remove it
              console.error("REMOVE BLOG", feed.htmlurl);
              return true;
            }
          })
      )
      .reduce((a, b) => a.concat(b), [])
  );
}

export { Process };
