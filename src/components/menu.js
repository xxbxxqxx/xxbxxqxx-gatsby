import React from 'react';
import { useStaticQuery, graphql, Link } from "gatsby"
//import { StyledMenu } from './menu.styled';

const Menu = ({ open }) => {
  const CategoryDataMenu = useStaticQuery(graphql`
    query CategoryDataMenu {
      allContentfulBlogCategoryMenu: allContentfulBlogCategory {
        edges {
          node {
            title
            slug
          }
        }
      }
    }
  `)

  const allCategories = CategoryDataMenu.allContentfulBlogCategoryMenu.edges

  return (
    <div className="menuSlide" style={open ? {transform: "translateX(0)"} : {transform: "translateX(100%)"}}>
      <div className="menuTitle">
        <span role="img" aria-label="about us" className="icon">&#x1f98c;</span>
        <Link to="/about">書いているひと</Link>
      </div>
      <div className="menuTitle">
        <span role="img" aria-label="price" className="icon">&#x1f4c1;</span>
        カテゴリー
        <ul className="categories">
          {allCategories && allCategories.map(({ node: category }) => {
            return(
              <li><Link to={`/category/${category.slug}/`}>{category.title}</Link></li>
            )
          })}
        </ul>
      </div>
      {/*}
      <div className="menuTitle">
        <span role="img" aria-label="contact" className="icon">&#x1f4e9;</span>
        <Link to="/">お問い合わせ</Link>
      </div>
    */}
    </div>
  )
}
export default Menu;