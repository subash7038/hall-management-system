import React, { useState, useCallback } from "react";
import { AuthContext } from "../../contexts/authContext";
import axios from "axios";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Switch from "@material-ui/core/Switch";
import Collapse from "@material-ui/core/Collapse";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import history from "../../common/history";
import { makeStyles, Button } from "@material-ui/core";

var days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let content = [];
function formatDate(str) {
  var dateObj = new Date(Date.parse(str));
  let month = String(dateObj.getMonth() + 1).padStart(2, "0");
  let day = String(dateObj.getDate()).padStart(2, "0");
  let year = dateObj.getFullYear();
  let output = day + "/" + month + "/" + year;
  return output;
}

const useStyles = makeStyles((theme) => ({
  heading: {
    textAlign: "center",
    color: theme.palette.primary.main,
    fontWeight: "bold",
    margin: "3rem 0 6rem",
  },
  paper: {
    width: "95%",
    minWidth: "320px",
    margin: "auto",
    maxWidth: "850px",
    padding: "1rem 0.5rem",
    marginTop: "3rem",
    display: "flex",
    flexDirection: "column",

    alignItems: "center",
    minHeight: "80vh",
    [theme.breakpoints.down("sm")]: {
      marginTop: 0,
    },
  },
  innerContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    width: "100%",
    marginBottom: "4rem",
  },
  head: {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
  },
  available: {
    color: "green",
    fontWeight: "bold",
  },
  booked: {
    color: "red",
    fontWeight: "bold",
  },
  wrapper: {
    width: "100%",
  },
}));

export default function Booking() {
  const classes = useStyles();
  const [from, setFrom] = useState(new Date());
  const [to, setTo] = useState(new Date());
  const [checked, setChecked] = React.useState(false);
  const [available, setAvailable] = useState(false);
  const [selectedDates, setSelectedDates] = useState([]);
  const [, updateState] = React.useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  const { setOpen } = React.useContext(AuthContext);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  function submitHandler() {
    content = [];
    setAvailable(false);
    setSelectedDates([]);
    setOpen(true);
    axios
      .post(process.env.REACT_APP_BACKEND_URL + "/api/book/check", {
        from: new Date(from.setUTCHours(0, 0, 0, 0)),
        to: new Date(
          checked ? to.setUTCHours(0, 0, 0, 0) : from.setUTCHours(0, 0, 0, 0)
        ),
      })
      .then((res) => {
        setOpen(false);
        function getDates(startDate, stopDate) {
          var dateArray = [];
          var currentDate = new Date(startDate);
          while (currentDate <= stopDate) {
            dateArray.push(new Date(currentDate).toString());
            currentDate.setDate(currentDate.getDate() + 1);
          }
          return dateArray;
        }
        let rangeOfDates = getDates(
          from,
          checked
            ? new Date(to.setUTCHours(0, 0, 0, 0))
            : new Date(from.setUTCHours(0, 0, 0, 0))
        );
        let bookedDates = res.data.bookedDates.map((item) => {
          return new Date(item).toString();
        });

        rangeOfDates.map((item) => {
          if (bookedDates.indexOf(item) !== -1) {
            content.push({
              date: item,
              status: "Booked",
            });
          } else {
            content.push({
              date: item,
              status: "Available",
            });
          }
          return null;
        });

        setAvailable(true);
      })
      .catch((err) => {
        setOpen(false);
        console.log(err);
      });
  }

  function bookSubmit() {
    history.push({ pathname: "/booking-form", state: { selectedDates } });
  }
  return (
    <Paper data-aos="fade-right" elevation={3} className={classes.paper}>
      <h3 className={classes.heading}>Check Availability</h3>
      <form className={classes.innerContainer}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label={checked ? "From :" : "Choose Date"}
            format="dd/MM/yyyy"
            value={from}
            minDate={Date.now()}
            minDateMessage="Invalid Date"
            onChange={(data) => setFrom(data)}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
          <Collapse in={checked}>
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="To"
              format="dd/MM/yyyy"
              value={to}
              minDate={from}
              minDateMessage="Invalid Date"
              onChange={(data) => setTo(data)}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </Collapse>
        </MuiPickersUtilsProvider>
        <FormControlLabel
          control={<Switch checked={checked} onChange={handleChange} />}
          label="More than one Date"
        />
        <Button variant="contained" color="primary" onClick={submitHandler}>
          Check Availability
        </Button>
      </form>
      <Collapse
        className={classes.innerContainer}
        classes={{ wrapper: classes.wrapper, wrapperInner: classes.wrapper }}
        in={available}
      >
        <form className={classes.wrapper}>
          <TableContainer
            className={classes.wrapper}
            style={{ marginBottom: "2rem" }}
            component={Paper}
          >
            <Table className={classes.wrapper} aria-label="simple table">
              <TableHead className={classes.head}>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell align="right">Day</TableCell>
                  <TableCell align="right">Availability</TableCell>
                  <TableCell align="right">Select</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {content.map((row, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell align="left">{formatDate(row.date)}</TableCell>
                      <TableCell align="right">
                        {days[new Date(Date.parse(row.date)).getDay()]}
                      </TableCell>
                      <TableCell
                        className={
                          row.status === "Available"
                            ? classes.available
                            : classes.booked
                        }
                        align="right"
                      >
                        {row.status}
                      </TableCell>
                      {row.status === "Available" ? (
                        <TableCell align="right">
                          <FormControlLabel
                            control={
                              <Checkbox
                                color="primary"
                                value={row.date}
                                onChange={(e) => {
                                  let index = selectedDates.indexOf(
                                    e.target.value
                                  );
                                  if (e.target.checked) {
                                    setSelectedDates([
                                      ...selectedDates,
                                      e.target.value,
                                    ]);
                                  } else if (index !== -1) {
                                    setSelectedDates((prev) => {
                                      selectedDates.splice(index, 1);
                                      return selectedDates;
                                    });
                                    forceUpdate();
                                  }
                                }}
                              />
                            }
                            label=""
                          />
                        </TableCell>
                      ) : (
                        <TableCell align="right">
                          <FormControlLabel
                            control={<Checkbox color="primary" disabled />}
                            label=""
                          />
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          <Button
            disabled={selectedDates.length === 0}
            variant="contained"
            color="primary"
            onClick={bookSubmit}
          >
            Book Hall
          </Button>
        </form>
      </Collapse>
    </Paper>
  );
}
