import { PrismTheme } from "prism-react-renderer";

import { ThemeConfig } from ".";

const prismTheme = (theme: ThemeConfig): PrismTheme => {
  return {
    plain: {
      color: theme.color.Foreground,
      backgroundColor: theme.color.Background,
    },
    styles: [
      {
        types: ["prolog", "comment", "block-comment", "doctype", "cdata"],
        style: {
          color: theme.color.Comment,
        },
      },
      {
        types: ["punctuation"],
        style: {
          color: theme.color.Foreground,
        },
      },
      {
        types: ["tag", "attr-name", "namespace", "deleted"],
        style: {
          color: theme.color.Red,
        },
      },
      {
        types: ["function-name"],
        style: {
          color: theme.color.Blue,
        },
      },
      {
        types: ["boolean", "number", "function"],
        style: {
          color: theme.color.Orange,
        },
      },
      {
        types: [
          "property",
          "class-name",
          "constant",
          "symbol",
          "console",
          "Promise",
          "unknown",
          "never",
        ],
        style: {
          color: theme.color.Yellow,
        },
      },
      {
        types: [
          "selector",
          "important",
          "atrule",
          "keyword",
          "builtin",
          "keyof",
          "module",
          "import",
          "require",
        ],
        style: {
          color: theme.color.Purple,
        },
      },
      {
        types: ["string", "char", "attr-value", "regex", "variable"],
        style: {
          color: theme.color.Green,
        },
      },
      {
        types: ["operator", "entity", "url", "of"],
        style: {
          color: theme.color.Aqua,
        },
      },
      {
        types: ["important", "bold"],
        style: {
          fontWeight: "bold",
        },
      },
      {
        types: ["italic"],
        style: {
          fontStyle: "italic",
        },
      },

      {
        types: ["inserted"],
        style: {
          color: theme.color.Green,
        },
      },

      {
        types: ["highlight-line"],
        style: {
          backgroundColor: theme.color.CurrentLine,
        },
      },
    ],
  };
};

export { prismTheme };
