import React, { useRef, useState } from "react"

import styles from "./search.module.css"

const baseURL = "https://api.napster.com"
const key = "apikey=ZTk2YjY4MjMtMDAzYy00MTg4LWE2MjYtZDIzNjJmMmM0YTdm"

const Main = () => {
  const [data, setData] = useState([])
  const searchInput = useRef<HTMLInputElement>(null)

  const callAPI = async (queryLiteral: string) => {
    let query = "query=" + queryLiteral
    let url = baseURL + `/v2.2/search/verbose?${key}&${query}`

    let response = await fetch(url)
    let json = await response.json()
    console.log(json)

    setData(json.search.data.tracks)
  }

  return (
    <>
      <form
        onSubmit={e => {
          setData([])
          const queryLiteral = searchInput.current?.value
          callAPI(queryLiteral ?? "")

          e.preventDefault()
          return false
        }}
      >
        <input className={styles.search} ref={searchInput} />
      </form>

      <div className={styles.container}>
        {data.map(({ albumName, name, previewURL }) => (
          <article key={name + albumName} className={styles.tracks}>
            <section className={styles.info}>
              <h2>{name}</h2>
              <p>{albumName}</p>
            </section>

            <audio controls>
              <source src={previewURL} type="audio/mpeg" />
            </audio>
          </article>
        ))}
      </div>
    </>
  )
}

export default Main
