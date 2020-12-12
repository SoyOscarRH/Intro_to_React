import React from "react"
import { Switch, Route } from "react-router-dom"

import { AnimatePresence } from "framer-motion"
import SpaceX from "./SpaceXApp"
import Detail from "./Detail"

const Main = () => {
  return (
    <main>
      <AnimatePresence>
        <Switch>
          <Route path="/:mission_id" component={Detail} />
          <Route path="/" component={SpaceX} />
        </Switch>
      </AnimatePresence>
    </main>
  )
}

export default Main
