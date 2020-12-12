import React from "react"
import { useQuery, gql } from "@apollo/client"
import { motion } from "framer-motion"
import {useHistory} from "react-router-dom"

import variant from "./variant"
import styles from "./spacex.module.css"

const LAUNCHES = gql`
  query launches {
    launchesPast(limit: 10) {
      id
      mission_name
      links {
        mission_patch_small
        flickr_images
      }
      rocket {
        rocket_name
      }
      launch_date_unix
    }
  }
`

const SpaceXApp = () => {
  const { loading, error, data } = useQuery(LAUNCHES)

  const history = useHistory()
  const goTo = (id: string) => history.push("/" + id)

  if (loading) {
    return <div>...loading </div>
  }

  if (error) {
    return <div>...error </div>
  }

  const { launchesPast } = data
  console.log(launchesPast)

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={variant}
      className={styles.container}
    >
      {launchesPast.map((launch: any) => (
        <section onClick={() => goTo(launch.id)} key={launch.mission_name} className={styles.card}>
          <header>
            <h1>{launch.mission_name}</h1>
            <h2>by {launch.rocket.rocket_name}</h2>
            <p>{launch.rocket.launch_date_unix}</p>
            {launch.links.mission_patch_small != null && (
              <img className={styles.icon} alt="mission" src={launch.links.mission_patch_small} />
            )}
          </header>

          {launch.links.flickr_images.slice(0, 2).map((url: string) => (
            <img key={url} className={styles.photo} alt="mission" src={url} />
          ))}
        </section>
      ))}
    </motion.div>
  )
}

export default SpaceXApp
