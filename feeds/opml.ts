interface OPML {
  title: string;
  children?: (Folder)[] | null;
}
interface Folder {
  text: string;
  title: string;
  children?: (Feed)[] | null;
}
interface Feed {
  type: string;
  text: string;
  title: string;
  xmlurl: string;
  htmlurl: string;
  folder: string;
  items?: FeedItem[];
}

export interface FeedItem {
  creator: string;
  title: string;
  link: string;
  pubDate: string;
  "dc:creator": string;
  content: string;
  contentSnippet: string;
  guid: string;
  categories?: (null)[] | null;
  isoDate: string;
}

export { OPML, Folder, Feed };
