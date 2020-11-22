import React, { useEffect, useState } from "react"
import styles from "./App.module.css"
import { useAudio } from "react-use"

import { Route, Switch, useHistory } from "react-router-dom"

import Search from "../Search/Search"
import Nav from "../Nav/Nav"
import Header from "../Header/Header"
import Player from "../Player/Player"

type song = { albumName: string; songName: string; url: string; needToPlay: boolean } | null
const App = () => {
  const [songInfo, setSong] = useState<song>(null)
  const [audio, state, controls, ref] = useAudio({ src: songInfo?.url ?? "", autoPlay: false })


  const history = useHistory()
  useEffect(() => {
    history.push("/search")
  }, [history])

  useEffect(() => {
    if (songInfo?.needToPlay) {
      controls.play()
      setSong({ ...songInfo, needToPlay: false })
    }
  }, [songInfo, controls])
  return (
    <section className={styles.container}>
      <Nav />
      {audio}
      <main className={styles.main}>
        <Header />

        <Switch>
          <Route path="/about">
            <div>About!</div>
          </Route>

          <Route path="/me">
            <div>Me! :D</div>
          </Route>

          <Route path="/search">
            <Search songInfo={songInfo} setSong={setSong} state={state} controls={controls} />
          </Route>
        </Switch>
      </main>
      <Player songInfo={songInfo} state={state} controls={controls} audio={ref.current} />
    </section>
  )
}

export type { song }

export default App
