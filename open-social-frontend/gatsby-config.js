module.exports = {
  siteMetadata: {
    title: "OpenSocial - Find Social Impact Open Source Projects",
    description:
      "OpenSocial is a social impact open source projects aggregator. Easily find active non profit projects and start coding a better world.",
    siteUrl: "https://www.open-social.net",
    lang: "en",
  },
  plugins: [
    `gatsby-plugin-preact`,
    "gatsby-plugin-antd",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: ["G-T30WTJGH3Y"],
        gtagConfig: {
          anonymize_ip: true,
          cookie_expires: 0,
        },
        pluginConfig: {
          head: true,
        },
      },
    },
    {
      resolve: "gatsby-plugin-s3",
      options: {
        bucketName: "open-social-front",
      },
    },
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        policy: [{ userAgent: "*", allow: "/" }],
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-apiserver",
      options: {
        typePrefix: "internal__",
        url:
          "https://api.open-social.net/projects",
        method: "get",
        name: `projects`,
      },
    },
  ],
}
