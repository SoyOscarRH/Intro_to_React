import React from "react"

import { song } from "../App/App"

import styles from "./player.module.css"
import { BiPause, BiPlay, BiVolumeFull, BiVolumeMute } from "react-icons/bi"
import { HTMLMediaControls, HTMLMediaState } from "react-use/lib/util/createHTMLMediaHook"

const Player: React.FC<{
  songInfo: song
  state: HTMLMediaState
  controls: HTMLMediaControls
  audio: HTMLAudioElement | null
}> = ({ songInfo, state, controls, audio }) => {
  const toggle = () => {
    if (state.paused) controls.play()
    else controls.pause()
  }

  const { time, duration } = state

  const percentage = time === 0 && duration === 0 ? 0 : (time / duration) * 100

  return (
    <footer className={styles.player}>
      <div className={styles.time} style={{ width: percentage + "%" }}></div>
      <div className={styles.container}>
        <div className={styles.info}>
          <div className={styles.album}>{songInfo?.albumName}</div>
          <div className={styles.song}>{songInfo?.songName}</div>
        </div>
        <div className={styles.playing} onClick={toggle}>
          {state.paused ? <BiPlay /> : <BiPause />}
        </div>
        <div className={styles.controls}>
          <div
            onClick={() => {
              if (state.muted) controls.unmute()
              else controls.mute()
            }}
          >
            {state.muted ? <BiVolumeMute /> : <BiVolumeFull />}
          </div>
          <div>
            <input
              min="0"
              max="1"
              step="0.01"
              value={state.volume}
              type="range"
              onChange={e => {
                controls.volume(+e.target.value)
              }}
            />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Player
