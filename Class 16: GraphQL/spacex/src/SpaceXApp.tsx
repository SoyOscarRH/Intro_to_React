import React from "react"
import { useQuery, gql } from "@apollo/client"

import styles from "./spacex.module.css"

const LAUNCHES = gql`
  query launches {
    launchesPast(limit: 10) {
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

  if (loading) {
    return <div>...loading </div>
  }

  if (error) {
    return <div>...error </div>
  }

  const { launchesPast } = data

  console.log(launchesPast)

  return (
    <main className={styles.container}>
      {launchesPast.map((launch: any) => (
        <section
          key={launch.mission_name}
          className={styles.card}
        >
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
    </main>
  )
}

export default SpaceXApp
