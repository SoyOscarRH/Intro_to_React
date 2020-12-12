import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import Main from "./Main"
import { ApolloProvider } from "@apollo/client"
import { HashRouter } from "react-router-dom"

import client from "./Client"

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <ApolloProvider client={client}>
        <Main />
      </ApolloProvider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
)
