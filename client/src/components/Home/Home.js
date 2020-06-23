import React from "react";
import { withRouter } from "react-router-dom";
import Jumbatron from "./Jumbatron/Jumbatron";
import Details from "./Details/Details";
import Welcome from "./Welcome/Welcome";
import Halls from "./Halls/Halls";

function Home(props) {
  return (
    <>
      <Jumbatron />

      <Welcome />
      <Details />
      <Halls />
    </>
  );
}

export default withRouter(Home);
