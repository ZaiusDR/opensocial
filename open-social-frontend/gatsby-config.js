module.exports = {
  siteMetadata: {
    title: "Open Social",
    description: "An humanitarian Open Source projects aggregator",
    siteUrl: "https://www.open-social.net",
    lang: "en"
  },
  plugins: [
    "gatsby-plugin-antd",
    "gatsby-plugin-image",
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          "G-T30WTJGH3Y",
        ],
        gtagConfig: {
          anonymize_ip: true,
          cookie_expires: 0,
        },
        pluginConfig: {
          head: false,
          respectDNT: true,
        },
      },
    },
    "gatsby-plugin-react-helmet",
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
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        policy: [{ userAgent: '*', allow: '/' }]
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
        url: "https://01ruue3xk0.execute-api.eu-west-1.amazonaws.com/dev/projects",
        method: "get",
        name: `projects`
      },
    },
  ],
};
