import React from "react"
import styles from "./nav.module.css"

import { BiSearchAlt, BiHomeAlt, BiLeftArrowAlt, BiMusic } from "react-icons/bi"

const Nav = () => {
  return (
    <aside>
      <div className={styles.selected}>
        <BiSearchAlt />
      </div>
      <BiHomeAlt />
      <BiLeftArrowAlt />
      <BiMusic />
    </aside>
  )
}

export default Nav
