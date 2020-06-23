import React from "react";
import DriveEtaIcon from "@material-ui/icons/DriveEta";
import LocalDiningIcon from "@material-ui/icons/LocalDining";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import OutdoorGrillIcon from "@material-ui/icons/OutdoorGrill";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  heading: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#ff6d00",
    margin: "2.5rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5rem",
    },
  },
  facility: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  column: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
  },
  row: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    margin: "1rem 0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: "3rem",
  },
  rowIcon: {
    textAlign: "center",
    width: "50%",
    height: "100%",
    [theme.breakpoints.down("sm")]: {
      width: "30%",
    },
  },
  rowText: {
    textAlign: "center",
    width: "50%",
    [theme.breakpoints.down("sm")]: {
      width: "70%",
    },
  },
  rowHeading: {
    margin: "1rem 0",
  },
  rowPara: {
    margin: "1rem 0",
  },
  icon: {
    minWidth: "4rem",
    color: theme.palette.primary.main,
    height: "100%",
    width: "30%",
  },
}));

function Row(props) {
  const classes = useStyles();
  return (
    <>
      <div className={classes.row}>
        <div data-aos="zoom-in" className={classes.rowIcon}>
          {props.children}
        </div>
        <div data-aos="zoom-in" className={classes.rowText}>
          <h5 className={classes.rowHeading}>{props.heading}</h5>
          <h6 className={classes.rowPara}>{props.text}</h6>
          <Divider variant="middle" />
        </div>
      </div>
    </>
  );
}

export default function Capacity() {
  const classes = useStyles();
  return (
    <>
      <h3 data-aos="zoom-in" className={classes.heading}>
        Facility and Services
      </h3>

      <div className={classes.facility}>
        <div className={classes.column}>
          <Row
            heading="Hall 1-Marriage hall"
            text={"seating Capacity with-2500+ with Air condition(AC)"}
          >
            <FavoriteIcon className={classes.icon} />
          </Row>
          <Row
            heading="Hall 1A-Dining Hall"
            text="Seating Capacity-600+ with Air Condition(AC)"
          >
            <LocalDiningIcon className={classes.icon} />
          </Row>
          <Row
            heading="Hall 2-Buffet Hall"
            text="Seating Capacity-2000+ Non-Air Condition(Non-AC)"
          >
            <FastfoodIcon className={classes.icon} />
          </Row>
        </div>
        <div className={classes.column}>
          <Row
            heading="Hall 3-Seminar Hall"
            text="Seating capacity-700+ with Air Condition(AC)"
          >
            <MeetingRoomIcon className={classes.icon} />
          </Row>
          <Row
            heading="Outdoor Party Lawn"
            text="Birthday parties,Corporate Events.Celebrations etc.,"
          >
            <OutdoorGrillIcon className={classes.icon} />
          </Row>
          <Row
            heading="Parking"
            text="Basement and Outdoor parking for 800+ cars"
          >
            <DriveEtaIcon className={classes.icon} />
          </Row>
        </div>
      </div>
    </>
  );
}
