import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./Welcome.css";

const useStyles = makeStyles((theme) => ({
  welcome: {
    // background: "#fff",
  },
  image: {
    width: "100%",
    height: "6rem",
    marginTop: "2rem",
    [theme.breakpoints.down("sm")]: {
      height: "4rem",
      marginTop: "1rem",
    },
  },
  heading: {
    textAlign: "center",
    marginTop: "2rem",
    [theme.breakpoints.down("sm")]: {
      marginTop: "1rem",
    },

    // background: "#fff",
  },
  head: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "2rem",
    },
  },
  text: {
    marginTop: "2rem",
    fontStyle: "italic",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
    },
  },
  dividerColor: {
    marginTop: "2rem",
    backgroundColor: theme.palette.primary.main,
    width: "20%",
    border: "1px solid " + theme.palette.primary.main,
  },
}));

export default function Welcome() {
  const classes = useStyles();
  return (
    <div data-aos="zoom-in-up" className={classes.welcome}>
      <img
        className={classes.image + " welcomeimage"}
        alt="welcome "
        src={require("../../../img/welcome.svg")}
      />

      <div className={classes.heading}>
        <h1 className={classes.head}>Welcome to Adithya Convention Centre</h1>
        <h3 className={classes.text}>A new rise in the city</h3>
        <hr className={classes.dividerColor} />
      </div>
    </div>
  );
}
