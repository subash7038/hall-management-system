import React from "react";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  text: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "95%",
  },
  heading: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#ff6d00",
    margin: "2.5rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5rem",
    },
  },
  common: {
    width: "65%",
    [theme.breakpoints.down("sm")]: {
      width: "95%",
    },
  },
  para: {
    textIndent: "10%",
    textAlign: "justify",
    margin: " 1rem auto",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.1rem",
    },
  },
  img: {
    width: "100%",
    maxHeight: "439px",
    maxWidth: "440px",
    boxShadow:
      " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    borderRadius: "5px",
    marginTop: "3rem",
  },
}));

export default function Capacity() {
  const classes = useStyles();
  return (
    <div className={classes.text} data-aos="fade-up">
      <h3 className={classes.heading}>Adithya Convention Centre</h3>
      <h5 className={classes.para + " " + classes.common}>
        Adithya Convention Centre gives you productive space whenever you need
        it.Whether you're meeting with customers,giving a presentation or a new
        product launch, we have flexible meeting space and conference facilities
        to suit.Our convention centre is flexible to suit small gatherings as
        well as conventions and press releases.Our convention centre is at a
        prime location in the heart of Coimbatore city.
      </h5>
      <h5 className={classes.para + " " + classes.common}>
        Our centre would be the ideal choice for people looking for fully
        equipped,economical meeting and conference venues.Whether you are a
        freelance writer looking to release your book or a corporate leader
        looking to convene a large gathering of shareholders we have the perfect
        meeting space for you with excellant aminities.
      </h5>
      <img
        alt="acc"
        className={classes.img}
        src={require("../../../img/details2.jpg")}
      />
    </div>
  );
}
