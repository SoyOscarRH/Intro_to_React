import React from "react"
import styles from "./App.module.css"

import Search from "../Search/Search"
import Nav from "../Nav/Nav"

const App = () => {
  return (
    <section className={styles.container}>
      <Nav />
      <main className={styles.main}>
        <Search />
      </main>
    </section>
  )
}

export default App
