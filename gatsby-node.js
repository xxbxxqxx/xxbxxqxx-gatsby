const path = require(`path`);
const slash = require(`slash`);

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  // we use the provided allContentfulBlogArticle query to fetch the data from Contentful
  return graphql(
    `
      {
        allContentfulBlogPost {
          edges {
            node {
              id
              slug
            }
          }
        }
        allContentfulBlogPage {
          edges {
            node {
              id
              slug
            }
          }
        }
        allContentfulBlogCategory {
          edges {
            node {
              title
              slug
            }
          }
        }
        allContentfulBlogTags {
          edges {
            node {
              slug
              title
            }
          }
        }
      }
    `
  ).then(result => {
      if (result.errors) {
        console.log("Error retrieving contentful data",      result.errors);
      }

      //記事詳細ページの作成
      const blogPostTemplate = path.resolve("./src/templates/post.js");
      // Then for each result we create a page.
      result.data.allContentfulBlogPost.edges.forEach(edge => {
        createPage({
          path: `/post/${edge.node.slug}/`,
          component: slash(blogPostTemplate),
          context: {
            slug: edge.node.slug,
            id: edge.node.id
          }
        });
      });

      //記事詳細ページの作成
      const blogPageTemplate = path.resolve("./src/templates/page.js");
      result.data.allContentfulBlogPage.edges.forEach(edge => {
        createPage({
          path: `/${edge.node.slug}/`,
          component: slash(blogPageTemplate),
          context: {
            slug: edge.node.slug,
            id: edge.node.id
          }
        });
      });

      //Index系ページの作成 
      const blogPostsPerPage = 7;
      const blogPostsTotal = result.data.allContentfulBlogPost.edges.length;
      const blogPages = Math.ceil(blogPostsTotal / blogPostsPerPage)
      Array.from({ length: blogPages }).forEach((_, i) => {
        createPage({
          path: i === 0 ? `/` : `/page/${i + 1}`,
          //component: path.resolve("./src/templates/pages.js"),
          component: path.resolve("./src/templates/indexPages.js"),
          context: {
            skip: blogPostsPerPage * i,
            limit: blogPostsPerPage,
            pageTotal: blogPages,
            currentPage: i + 1,
            isFirst: i + 1 === 1,
            isLast: i + 1 === blogPages,
          },
        })
      })

      //Categoryごとの記事一覧ページ
      const categoryTemplate = path.resolve("./src/templates/category.js");
      const categories = result.data.allContentfulBlogCategory.edges;
      categories.forEach(edge => {
        createPage({
          path: `/category/${edge.node.slug}/`,
          component: categoryTemplate,
          context: {
            title: edge.node.title,
            slug: edge.node.slug,
          },
        })
      })

      //Tagごとの記事一覧ページ
      const tagTemplate = path.resolve("./src/templates/tag.js");
      const tags = result.data.allContentfulBlogTags.edges;
      tags.forEach(edge => {
        createPage({
          path: `/tag/${edge.node.slug}/`,
          component: tagTemplate,
          context: {
            title: edge.node.title,
            slug: edge.node.slug,
          },
        })
      })

    })
    .catch(error => {
      console.log("Error retrieving contentful data", error);
    });
};