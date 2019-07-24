// Convert source.opml to an object
// traverse the object in parallel and download the rss feed
// convert the rss feed to js
// pull the top 3 items from each feed
// pipe those items into a gatsby site

import { Process } from "./process";

Process({ source: "../source.opml", output: "./output" });
