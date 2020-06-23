import React, { useState, useCallback } from "react";
import { rangeOfDates } from "../../common/functions";

import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Switch from "@material-ui/core/Switch";
import Collapse from "@material-ui/core/Collapse";
// import "./form.css";
import axios from "axios";
import { AuthContext } from "../../contexts/authContext";
import { makeStyles, Button, Paper } from "@material-ui/core";
import Succes from "../../common/SuccessAlert";

import { Form, Col, Row } from "react-bootstrap";
import {
  FormControlLabel,
  Checkbox,
  TextField,
  TextareaAutosize,
} from "@material-ui/core";
import "react-phone-number-input/style.css";
import MuiPhoneInput from "material-ui-phone-number";

export default function BookForm(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [event, setEvent] = useState("");
  const [address, setAddress] = useState("");
  const [from, setFrom] = useState(new Date());

  const [checked, setChecked] = React.useState(false);
  const [no, setNo] = useState("");
  const [halls, setHalls] = useState([]);
  const [success, setSuccess] = useState(false);
  const [, updateState] = React.useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  const { setOpen } = React.useContext(AuthContext);
  const [to, setTo] = useState(checked ? new Date() : from);
  const useStyles = makeStyles((theme) => ({
    heading: {
      textAlign: "center",
      color: theme.palette.primary.main,
      fontWeight: "bold",
      margin: "2rem 0",
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
        marginTop: "1rem",
      },
    },
    form: {
      width: "100%",
      padding: "3rem",
      fontSize: "1.2rem",
      [theme.breakpoints.down("sm")]: {
        padding: "1.5rem",
      },
    },
    formGroup: {
      display: "flex",
      justifyContent: "center",
    },
    label: {
      textAlign: "right",
      [theme.breakpoints.down("sm")]: {
        textAlign: "left",
      },
    },
    textfield: {
      width: "100%",
      fontSize: "1.2rem",
    },
  }));

  const classes = useStyles();

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  //   let formatedDates = selectedDates.map((item) => {
  //     return formatDate(item);
  //   });

  function submitHandler(e) {
    console.log(from, to);
    console.log(
      rangeOfDates(from.setUTCHours(0, 0, 0, 0), to.setUTCHours(0, 0, 0, 0))
    );
    setSuccess(false);
    setOpen(true);
    axios
      .post(process.env.REACT_APP_BACKEND_URL + "/api/book", {
        dates: rangeOfDates(
          from.setUTCHours(0, 0, 0, 0),
          checked ? to : from.setUTCHours(0, 0, 0, 0)
        ),
        name,
        email,
        event,
        address,
        no,
        halls,
      })
      .then((res) => {
        setOpen(false);
        setSuccess(true);
        console.log(res.data);
      })
      .catch((err) => {
        setOpen(false);
        console.log(err);
      });
  }

  const hallHandler = (e) => {
    let index = halls.indexOf(e.target.value);
    if (e.target.checked) {
      setHalls([...halls, e.target.value]);
    } else if (index !== -1) {
      setHalls((prev) => {
        halls.splice(index, 1);
        return halls;
      });
    }
    forceUpdate();
  };

  return (
    <>
      <Paper className={classes.paper}>
        <h3 className={classes.heading}>Book Hall</h3>
        <form className={classes.form}>
          <Form.Group className={classes.formGroup} as={Row}>
            <Form.Label className={classes.label} column sm="5">
              Choose Date(s):
            </Form.Label>
            <Col sm="7">
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
                    value={checked ? to : from}
                    minDate={from}
                    minDateMessage="Invalid Date"
                    onChange={(data) => setTo(data)}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </Collapse>
              </MuiPickersUtilsProvider>
            </Col>
          </Form.Group>
          <Form.Group className={classes.formGroup} as={Row}>
            <Form.Label className={classes.label} column sm="5"></Form.Label>
            <Col sm="7">
              <FormControlLabel
                control={<Switch checked={checked} onChange={handleChange} />}
                label="More than one Date"
              />
            </Col>
          </Form.Group>

          <Form.Group className={classes.formGroup} as={Row}>
            <Form.Label className={classes.label} column sm="5">
              Full Name:
            </Form.Label>
            <Col sm="7">
              <TextField
                className={classes.textfield}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group className={classes.formGroup} as={Row}>
            <Form.Label className={classes.label} column sm="5">
              Email:
            </Form.Label>
            <Col sm="7">
              <TextField
                className={classes.textfield}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group className={classes.formGroup + " mb-0"} as={Row}>
            <Form.Label className={classes.label} column sm="5">
              Choose Halls:
            </Form.Label>
            <Col sm="7">
              <FormControlLabel
                control={
                  <Checkbox
                    value="Hall-1 Marriage Hall"
                    onChange={hallHandler}
                    color="primary"
                  />
                }
                label="Hall-1 Marriage Hall"
              />
            </Col>
          </Form.Group>
          <Form.Group className={classes.formGroup + " mb-0"} as={Row}>
            <Form.Label className={classes.label} column sm="5"></Form.Label>
            <Col sm="7">
              <FormControlLabel
                control={
                  <Checkbox
                    value="Hall-1A-Dining Hall"
                    onChange={hallHandler}
                    color="primary"
                  />
                }
                label="Hall-1A-Dining Hall"
              />
            </Col>
          </Form.Group>
          <Form.Group className={classes.formGroup + " mb-0"} as={Row}>
            <Form.Label className={classes.label} column sm="5"></Form.Label>
            <Col sm="7">
              <FormControlLabel
                control={
                  <Checkbox
                    value="Hall-2-Buffet hall"
                    onChange={hallHandler}
                    color="primary"
                  />
                }
                label="Hall-2-Buffet hall"
              />
            </Col>
          </Form.Group>
          <Form.Group className={classes.formGroup + " mb-0"} as={Row}>
            <Form.Label className={classes.label} column sm="5"></Form.Label>
            <Col sm="7">
              <FormControlLabel
                control={
                  <Checkbox
                    value="Hall-3-Seminar"
                    onChange={hallHandler}
                    color="primary"
                  />
                }
                label="Hall-3-Seminar"
              />
            </Col>
          </Form.Group>
          <Form.Group className={classes.formGroup} as={Row}>
            <Form.Label className={classes.label} column sm="5">
              Event:
            </Form.Label>
            <Col sm="7">
              <TextField
                className={classes.textfield}
                value={event}
                onChange={(e) => setEvent(e.target.value)}
                helperText="eg:Marriage,birthday party etc.."
              />
            </Col>
          </Form.Group>

          <Form.Group className={classes.formGroup} as={Row}>
            <Form.Label className={classes.label} column sm="5">
              Address:
            </Form.Label>
            <Col sm="7">
              <TextareaAutosize
                className={classes.textfield}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rowsMin={4}
                cols={24}
              />
            </Col>
          </Form.Group>

          <Form.Group className={classes.formGroup} as={Row}>
            <Form.Label className={classes.label} column sm="5">
              Contact number :
            </Form.Label>
            <Col sm="7">
              <MuiPhoneInput
                className={classes.textfield}
                defaultCountry="in"
                value={no}
                onChange={(e) => setNo(e)}
              />
            </Col>
          </Form.Group>
          <Form.Group className={classes.formGroup} as={Row}>
            <Button variant="contained" color="primary" onClick={submitHandler}>
              Book Hall
            </Button>
          </Form.Group>
          {success ? <Succes>Booked Successfully!</Succes> : undefined}
        </form>
      </Paper>
    </>
  );
}
