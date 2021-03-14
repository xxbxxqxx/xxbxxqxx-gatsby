import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Img from "gatsby-image";
import marked from "marked";
//import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

marked.setOptions({
  pedantic: false,
  gfm: true,
  breaks: true,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
});

const blogPage = ({ data, location }) => {
  const post = data.contentfulBlogPage;
  return (
    <Layout>
      <SEO title={`${post.title} | xxbxxqxx`} />
      <div className="post page">
        <div className="container">
          <div className="main">
            <div className="postContent pageContent">
              <h1>{post.title}</h1>
              <div className="body-text">
                {/*documentToReactComponents(post.content.json, options)*/}
                <div className="body-text" dangerouslySetInnerHTML={{ __html: marked(post.content.content) }} />
              </div>
            </div>
            <div className="buttonBMCPostWrapper">
              <p>もし記事がお役に立ちましたら、サポートいただけると嬉しいです。</p>
              <a href="https://www.buymeacoffee.com/xxbxxqxx" target="_blank" rel="noreferrer">
                <Img fluid={data.imgBuyMeACoffee.childImageSharp.fluid} alt="Buy Me A Coffee" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default blogPage;
export const blogPageQuery = graphql`
  query( $slug: String ) {
    contentfulBlogPage(slug: { eq: $slug }) {
      id
      title
      content{
        content
      }
      createdAt(formatString: "YYYY/MM/DD")
    }
    imgBuyMeACoffee:file(relativePath: {eq: "BMCLogoMark.png"}) {
        childImageSharp{
          fluid(maxWidth: 300, quality: 80) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
    }
  }
`;