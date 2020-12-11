import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import SpaceXApp from "./SpaceXApp"
import { ApolloProvider } from "@apollo/client"

import client from "./Client"

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <SpaceXApp />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
