import React, { useRef, useState, FunctionComponent as FC } from "react"
import { song } from "../App/App"
import { HTMLMediaControls, HTMLMediaState } from "react-use/lib/util/createHTMLMediaHook"

import { BiSearchAlt, BiPause, BiPlay } from "react-icons/bi"

import styles from "./search.module.css"

const baseURL = "https://api.napster.com"
const key = "apikey=ZTk2YjY4MjMtMDAzYy00MTg4LWE2MjYtZDIzNjJmMmM0YTdm"

const Search: React.FC<{
  setSong: (arg0: song) => void
  state: HTMLMediaState
  controls: HTMLMediaControls
  songInfo: song
}> = ({ songInfo, setSong, state, controls }) => {
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
          <input className={styles.search} ref={searchInput} placeholder="Search something!" />
        </section>
      </form>

      {message !== "" ? (
        <h2 className={styles.message}>{message}</h2>
      ) : (
        <div className={styles.container}>
          {data.map(({ albumName, name, previewURL }) => (
            <Result
              key={name + albumName}
              setSong={setSong}
              album={albumName}
              song={name}
              url={previewURL}
              songInfo={songInfo}
              state={state}
              controls={controls}
            />
          ))}
        </div>
      )}
    </>
  )
}

const colors: Array<[string, string]> = [
  ["#fca3cc", "#fbbedf"],
  ["#14274e", "#394867"],
  ["#c56183", "#794c74"],
  ["#cf7500", "#f0a500"],
  ["#3e978b", "#2ec1ac"],
  ["#2f2519", "#4a3f35"],
  ["#086972", "#01a9b4"],
  ["#ff9a76", "#ffc4a3"],
]

const Result: FC<{
  setSong: (arg0: song) => void
  album: string
  song: string
  url: string
  state: HTMLMediaState
  controls: HTMLMediaControls
  songInfo: song
}> = ({ album, song, url, setSong, state, controls, songInfo }) => {
  const itIsMe = songInfo != null && songInfo.albumName === album && songInfo.songName === song

  const [myColors] = useState(() => colors[Math.floor(Math.random() * colors.length)])

  const [color1, color2] = myColors
  return (
    <article
      className={styles.track}
      style={{ background: `linear-gradient(90deg, ${color1} 0%, ${color2} 100%)` }}
    >
      <section className={styles.info}>
        <p>{album}</p>
        <h2>{song}</h2>
      </section>

      <div
        className={styles.control}
        onClick={() => {
          if (itIsMe) {
            state.paused ? controls.play() : controls.pause()
          } else {
            setSong({ albumName: album, songName: song, url, needToPlay: true })
          }
        }}
      >
        {itIsMe && !state.paused ? <BiPause /> : <BiPlay />}
      </div>
    </article>
  )
}

export default Search
