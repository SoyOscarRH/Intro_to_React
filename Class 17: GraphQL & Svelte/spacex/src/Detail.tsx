import React from "react"

import variant from "./variant"
import { motion } from "framer-motion"
import { useParams } from "react-router-dom"
import { useQuery, gql } from "@apollo/client"

const QUERY = gql`
  query($id: ID!) {
    launch(id: $id) {
      id
      mission_name
      details
      links {
        mission_patch_small
        flickr_images
      }
      rocket {
        rocket_name
      }
      launch_date_utc
    }
  }
`

const Detail = () => {
  const { mission_id } = useParams<{ mission_id: string }>()
  const { loading, error, data } = useQuery(QUERY, {
    variables: { id: mission_id },
  })

  if (loading) {
    return <div>...loading </div>
  }

  if (error) {
    return <div>...error </div>
  }

  const { launch } = data
  console.log(launch)

  return (
    <motion.div
      style={{ padding: "3rem", backgroundColor: "#333456", color: "#bbbfca" }}
      initial="initial"
      animate="in"
      exit="out"
      variants={variant}
    >
      <header>
        <h1>{launch.mission_name}</h1>
        <h2>by {launch.rocket.rocket_name}</h2>
        <p>{launch.launch_date_utc}</p>
        <p>{launch.details}</p>
        {launch.links.mission_patch_small != null && (
          <img style={{maxWidth: "5rem"}} alt="mission" src={launch.links.mission_patch_small} />
        )}
      </header>

      {launch.links.flickr_images.slice(0, 2).map((url: string) => (
        <img style={{maxWidth: "5rem"}} key={url} alt="mission" src={url} />
      ))}
    </motion.div>
  )
}

export default Detail
