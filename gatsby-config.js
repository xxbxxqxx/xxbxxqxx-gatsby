require('dotenv').config();

module.exports = {
  siteMetadata: {
    title: `xxbxxqxx`,
    description: `とある辺境からの便り。ドイツ生活、山登り、ガジェット、読んだ本の紹介など。`,
    author: `Ryo Konishi`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `xxbxxqxx`,
        short_name: `xxbxxqxx`,
        start_url: `https://xxbxxqxx.com`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/logo-bgwhite-circlecut.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        typekit: {
          id: process.env.TYPEKIT_ID,
        },
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    }
    //{
    //  resolve: `gatsby-plugin-sitemap`,
    //  options: {
        //output: `/some-other-sitemap.xml`,
        //exclude: [`/category/*`, `/path/to/page`],
        //query: `
        //  {
        //    wp {
        //      generalSettings {
        //        siteUrl
        //      }
        //    }
        //    allSitePage {
        //      nodes {
        //        path
        //      }
        //    }
        //}`,
        //resolveSiteUrl: ({site, allSitePage}) => {
          //Alternatively, you may also pass in an environment variable (or any location) at the beginning of your `gatsby-config.js`.
          //return site.wp.generalSettings.siteUrl
        //},
        //serialize: ({ site, allSitePage }) =>
        //  allSitePage.nodes.map(node => {
        //    return {
        //      url: `${site.wp.generalSettings.siteUrl}${node.path}`,
        //      changefreq: `daily`,
        //      priority: 0.7,
        //    }
        //  })
    //  }
    //},
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
