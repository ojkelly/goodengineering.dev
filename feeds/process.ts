import * as fs from "fs";
import * as path from "path";
import * as opmlToJSON from "opml-to-json";
import * as rimraf from "rimraf";
import { timeout } from "promise-timeout";
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

  return await Promise.all(
    opml.children
      .map(
        folder =>
          folder.children &&
          folder.children.map(async feed => {
            try {
              await timeout(
                new Promise(async (resolve, reject) => {
                  try {
                    const url = new URL(feed.htmlurl);

                    const items = await parser.parseURL(feed.xmlurl);

                    await fs.mkdirSync(
                      path.join(__dirname, output, url.hostname),
                      {
                        recursive: true,
                      }
                    );

                    await fs.writeFileSync(
                      path.join(__dirname, output, url.hostname, "feed.json"),
                      JSON.stringify({ ...feed, ...items }, null, 2),
                      { encoding: "utf8" }
                    );

                    resolve();
                  } catch (err) {
                    reject(err);
                  }
                }),
                60000
              );
              return true;
            } catch (err) {
              if (!err.toString().includes("429")) {
                console.error("FAILED: ", feed.xmlurl);

                console.error(err);
                // If this blog continues to error, we'll remove it
                const opmlRaw = fs.readFileSync(path.join(__dirname, source));

                const opmlLines = opmlRaw.toString().split("\n");

                const opmlUpdate = opmlLines
                  .map(line => {
                    if (line.includes(feed.xmlurl)) {
                      return;
                    }

                    return line;
                  })
                  .filter(Boolean)
                  .join("\n");

                await fs.writeFileSync(
                  path.join(__dirname, source),
                  opmlUpdate,
                  {
                    encoding: "utf8",
                  }
                );
              }

              return true;
            }
          })
      )
      .reduce((a, b) => a.concat(b), [])
  );
}

export { Process };
