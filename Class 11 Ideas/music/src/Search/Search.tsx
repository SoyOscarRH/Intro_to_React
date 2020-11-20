import React, { useRef, useState } from "react"

import { BiSearchAlt } from "react-icons/bi"

import styles from "./search.module.css"

const baseURL = "https://api.napster.com"
const key = "apikey=ZTk2YjY4MjMtMDAzYy00MTg4LWE2MjYtZDIzNjJmMmM0YTdm"

const Main = () => {
  const [data, setData] = useState([])
  const [message, setMessage] = useState("Let's search something ;)")
  const searchInput = useRef<HTMLInputElement>(null)

  const callAPI = async (queryLiteral: string) => {
    let query = "query=" + queryLiteral
    let url = baseURL + `/v2.2/search/verbose?${key}&${query}`

    let response = await fetch(url)
    let json = await response.json()
    console.log(json)

    setMessage("")
    setData(json.search.data.tracks)
  }

  const search = () => {
    setData([])
    setMessage("Loading ...")

    const queryLiteral = searchInput.current?.value
    callAPI(queryLiteral ?? "")
  }

  return (
    <>
      <form
        onSubmit={e => {
          search()
          e.preventDefault()
          return false
        }}
      >
        <section className={styles.area}>
          <div className={styles.iconWrapper} onClick={search}>
            <BiSearchAlt />
          </div>
          <input className={styles.search} ref={searchInput} />
        </section>
      </form>

      {message !== "" ? (
        <h2 className={styles.message}>{message}</h2>
      ) : (
        <div className={styles.container}>
          {data.map(({ albumName, name, previewURL }) => (
            <article key={name + albumName} className={styles.track}>
              <section className={styles.info}>
                <p>{albumName}</p>
                <h2>{name}</h2>
              </section>

              <audio controls>
                <source src={previewURL} type="audio/mpeg" />
              </audio>
            </article>
          ))}
        </div>
      )}
    </>
  )
}

export default Main
