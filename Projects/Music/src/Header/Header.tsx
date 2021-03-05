import React, { FunctionComponent as FC } from "react"
import { Link, useLocation } from "react-router-dom"

import style from "./header.module.css"

const MyLink: FC<{ title: string; to: string }> = ({ title, to }) => {
  const { pathname } = useLocation()
  const currentStyle = pathname === to ? style.selected : style.noSelected

  return (
    <Link to={to} className={style.myLink + " " + currentStyle}>
      <div className={style.title}>{title}</div>
    </Link>
  )
}

const Header = () => {
  return (
    <header>
      <nav className={style.header}>
        <MyLink title="Me" to="/me" />
        <MyLink title="Search" to="/search" />
        <MyLink title="Podcast" to="/podcast" />
        <MyLink title="About" to="/about" />
        <MyLink title="I have no idea" to="/noidea" />
        <MyLink title="Other" to="/other" />
      </nav>
    </header>
  )
}

export default Header
