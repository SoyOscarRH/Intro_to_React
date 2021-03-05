import React from "react"
import styles from "./nav.module.css"

import { BiSearchAlt, BiHomeAlt, BiLeftArrowAlt, BiMusic } from "react-icons/bi"

const icons = [BiSearchAlt, BiHomeAlt, BiLeftArrowAlt, BiMusic]
const Nav = () => {
  return (
    <aside>
      {icons.map((Icon, index) => (
        <div key={index} className={Icon === BiSearchAlt ? styles.selected : styles.unselected}>
          <Icon />
        </div>
      ))}
    </aside>
  )
}

export default Nav
