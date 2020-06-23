import React from "react";
import Text from "./Text/Text";
import Facilities from "./Facilities/Facilities";
import Capacity from "./Capacity/Capacity";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minWidth: "320px",
    width: "95%",
    paddingBottom: "5rem",
  },
}));
export default function About() {
  const classes = useStyles();

  return (
    <Paper className={classes.paper} elevation={3}>
      <Text />
      <Facilities />
      <Capacity />
    </Paper>
  );
}
