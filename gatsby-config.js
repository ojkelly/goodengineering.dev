// @ts-check

module.exports = {
  siteMetadata: {
    title: "Good Engineering",
    description: "Stories from the top engineering blogs in one place.",
    author: "Owen Kelly",
  },

  plugins: [
    "gatsby-plugin-netlify-cache",
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `IBM Plex Serif`,
            variants: [`400`],
          },
          {
            family: `IBM Plex Mono`,
            variants: [`400`, `400i`, `700`],
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/theme/typography`,
        omitGoogleFont: true,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "posts",
        path: `${__dirname}/feeds/output/`,
      },
    },
    "gatsby-plugin-catch-links",
    "gatsby-plugin-typescript",
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-styled-components",
      options: {
        ssr: true,
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /src/,
        },
      },
    },
        'gatsby-plugin-offline'
  ],
};
