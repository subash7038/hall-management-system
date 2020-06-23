import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",

    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
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
  head: {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
  },
  paper: {
    width: "100%",
  },
  innercontainer: {
    width: "45%",
    margin: "0 1rem",
    [theme.breakpoints.down("md")]: {
      width: "95%",
    },
  },
}));

function createData(name, dim, area, cap) {
  return { name, dim, area, cap };
}

const rows = [
  createData("Hall 1 (Marriage Hall)", "145' X 165'", "23925 Sq.ft", "2500"),
  createData("Stage", "70' X 30'", "2100 Sq.ft", "-"),
  createData("Hall 1A( Dining Hall)", "145' X 135'", "19575 Sq.ft", "600"),
  createData("Hall 2 (Buffet Hall)", "185' X 165'", "30525 Sq.ft", "2000"),
  createData("Hall 3 (Seminar Hall)", "145' X 45'", "6525 Sq.ft", "700"),
  createData("Lawn", "150' X 150'", "22500 Sq.ft", "-"),
];

export default function Capacity() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.innercontainer} data-aos="fade-up">
        <h3 className={classes.heading}>Capacity Chart</h3>
        <TableContainer className={classes.paper} component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead className={classes.head}>
              <TableRow>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Dimensions</TableCell>
                <TableCell align="center">Area</TableCell>
                <TableCell align="center">Seating Capacity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell align="center" component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="center">{row.dim}</TableCell>
                  <TableCell align="center">{row.area}</TableCell>
                  <TableCell align="center">{row.cap}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className={classes.innercontainer} data-aos="fade-up">
        <h3 className={classes.heading}>Distance From Main Points</h3>
        <TableContainer className={classes.paper} component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead className={classes.head}>
              <TableRow>
                <TableCell align="center">Location</TableCell>
                <TableCell align="center">Distance (in km)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center">Gandhipuram</TableCell>
                <TableCell align="center">10.0</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">Railway Station</TableCell>
                <TableCell align="center">12.0</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">Ukkadam</TableCell>
                <TableCell align="center">13.5</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">Airport</TableCell>
                <TableCell align="center">11.0</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">Near Hospital</TableCell>
                <TableCell align="center">0.5</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
