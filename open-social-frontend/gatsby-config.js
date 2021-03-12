module.exports = {
  siteMetadata: {
    title: "Open Social",
  },
  plugins: [
    "gatsby-plugin-antd",
    "gatsby-plugin-image",
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: '"cHmuOEOke-_B5U7Ns3rJlBT-pTN4qipfs7W08LtEn2w"',
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
  ],
};
