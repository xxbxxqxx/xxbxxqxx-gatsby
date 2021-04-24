
import { useStaticQuery, graphql, Link } from "gatsby"
//import PropTypes from "prop-types"
import React from "react"
//import ImageStatic from "../components/imageStatic";
//import ImageBlur from "../components/imageBlur";
//import Img from "gatsby-image"

const Footer = ({ siteTitle }) => {
  const CategoryData = useStaticQuery(graphql`
    query CategoryData {
      allContentfulBlogCategory {
        edges {
          node {
            title
            slug
          }
        }
      }
    }
  `)

  const allCategories = CategoryData.allContentfulBlogCategory.edges

  return (
  <footer>
    <div className="container flex-row ">
      <div className="footer-content-copyright flex-column-4">
        © 2021 <a href="https://xxbxxqxx.com/" rel="home">xxbxxqxx</a>
      </div>
      <div className="footer-content-links flex-column-8 flex-row">
        <div className="flex-column-4">
          <p className="footer-subtitle">Category</p>
          <ul>
            {allCategories && allCategories.map(({ node: category }) => {
              return(
                <li><Link to={`/category/${category.slug}/`}>{category.title}</Link></li>
              )
            })}
          </ul>
        </div>
        <div className="flex-column-4">
          <p className="footer-subtitle">Feature</p>
          <ul>
            <li><Link to="/tag/germany/">#ドイツ</Link></li>
            <li><Link to="/tag/books_choice/">#読んでよかった本</Link></li>
            <li><Link to="/tag/gear_hike/">#私の山道具</Link></li>
            <li><Link to="/tag/eurasia_hiker/">#ユーラシアハイカー</Link></li>
          </ul>
        </div>
        <div className="flex-column-4">
          <p className="footer-subtitle">About</p>
          <ul>
            <li><a href="/about/">Profile</a></li>
            <li><a href="https://twitter.com/xxbxxqxx" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            <li><a href="https://www.instagram.com/xxbxxqxx/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
  )
}

export default Footer
