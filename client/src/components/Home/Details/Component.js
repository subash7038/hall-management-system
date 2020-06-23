import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import Button from "@material-ui/core/Button";

export default function Component(props) {
  const useStyles = makeStyles((theme) => ({
    paper: {
      display: "flex",
      flexDirection: props.image === "right" ? "row-reverse" : "row",
      justifyContent: "center",
      marginTop: "10vh",

      [theme.breakpoints.down("sm")]: {
        marginTop: "5vh",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      },
    },

    textPaper: {
      margin: "0 1rem",
      paddingTop: "3rem",
      height: "100%",
      [theme.breakpoints.down("sm")]: {
        margin: "2rem 0",
        textAlign: "center",
      },
    },
    image: {
      maxHeight: "439px",
      maxWidth: "440px",
      boxShadow:
        " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    },
    text: {
      opacity: "0.7",
      marginBottom: "2rem",
    },
  }));
  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <img
        data-aos="zoom-in"
        className={classes.image}
        alt="details"
        src={props.url}
      />
      <Grid className={classes.textPaper} item md={6} sm={12}>
        <div
          data-aos={"fade-".concat(props.image === "left" ? "left" : "right")}
        >
          <h2 style={{ marginBottom: "3rem" }}>{props.text}</h2>
          <h3 className={classes.text}>{props.para}</h3>

          <a href={props.location}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              className={classes.button}
              endIcon={<ArrowForwardIcon />}
            >
              {props.name}
            </Button>
          </a>
        </div>
      </Grid>
    </div>
  );
}
