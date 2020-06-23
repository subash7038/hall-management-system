import React from "react";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((them) => ({
  div: {
    height: "90vh",

    textAlign: "center",
    padding: "20rem",
    fontSize: "3rem",
  },
}));

export default function Gallery() {
  const classes = useStyles();
  return <div className={classes.div}>Gallery </div>;
}
