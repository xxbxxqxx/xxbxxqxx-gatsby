import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
//import Img from "gatsby-image";
import SEO from "../components/seo"
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import ShowPosts from "../components/showPosts"

const PageLists = ({ data, location, pageContext }) => {
  const posts = data.allContentfulBlogPostPages.edges;

  return (
  <Layout>
    <SEO title="xxbxxqxx | 辺境からの便り。" />
    <div className={`Home-page${pageContext.currentPage}`}>
      <div className="container containerTop">
        <h2>
          すべての記事
          {pageContext.currentPage !== 1 && `(${pageContext.currentPage}ページ目)` }
        </h2>
        <ShowPosts
          postEdges={posts}
        />
        <Pagination
          page={pageContext.currentPage}
          count={pageContext.pageTotal}
          renderItem={(item) => (
            <PaginationItem
              component={Link}
              to={`/${item.page === 1 ? '' : `page/${item.page}`}`}
              {...item}
            />
          )}
        />
      </div>
    </div>
  </Layout>
  );
};
export default PageLists

export const query = graphql`
  query QueryPages($skip: Int!, $limit: Int!) {
    allContentfulBlogPostPages: allContentfulBlogPost(
      sort: {fields: publishedAt, order: DESC}
      skip: $skip
      limit: $limit
    ){
      edges {
        node {
          title
          slug
          content{
            content
          }
          thumbnail {
            fluid(maxWidth : 400, maxHeight : 200, resizingBehavior: FILL, quality: 75) {
              ...GatsbyContentfulFluid_withWebp
            }
            description
          }
          category{
            slug
            title
          }
          tags{
            slug
            title
          }
          publishedAt(formatString: "YYYY/MM/DD")
          createdAt(formatString: "YYYY-MM-DD")
        }
      }
    }
  }
`;