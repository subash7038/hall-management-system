import React, { useState, useCallback } from "react";
// import "./form.css";
import axios from "axios";
import Navbar from "../Header/Navbar";
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
function formatDate(str) {
  var dateObj = new Date(Date.parse(str));
  let month = String(dateObj.getMonth() + 1).padStart(2, "0");
  let day = String(dateObj.getDate()).padStart(2, "0");
  let year = dateObj.getFullYear();
  let output = day + "/" + month + "/" + year;
  return output;
}

export default function BookForm(props) {
  const [selectedDates] = useState(props.location.state.selectedDates);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [event, setEvent] = useState("");
  const [address, setAddress] = useState("");
  const [no, setNo] = useState("");
  const [halls, setHalls] = useState([]);
  const [success, setSuccess] = useState(false);
  const [, updateState] = React.useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  const { isAuthenticated, setOpen } = React.useContext(AuthContext);
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

  React.useEffect(() => {
    if (
      name === "" &&
      email === "" &&
      event === "" &&
      address === "" &&
      no === ""
    ) {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  });

  let formatedDates = selectedDates.map((item) => {
    return formatDate(item);
  });
  const submitHandler = (e) => {
    setOpen(true);
    axios
      .post(process.env.REACT_APP_BACKEND_URL + "/api/request", {
        dates: selectedDates,
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
        setSuccess(false);
      });
  };
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
      <Navbar
        items={
          isAuthenticated
            ? [
                "home",
                "about us",
                "contact us",
                "gallery",
                "booking",
                "dashboard",
              ]
            : ["home", "about us", "contact us", "gallery", "booking"]
        }
      />
      <Paper className={classes.paper}>
        <h3 className={classes.heading}>Booking</h3>
        <form className={classes.form}>
          <Form.Group className={classes.formGroup} as={Row}>
            <Form.Label className={classes.label} column sm="5">
              Date(s):
            </Form.Label>
            <Col sm="7">
              <Form.Control
                plaintext
                readOnly
                defaultValue={formatedDates.join("  ,  ")}
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
              Request Booking
            </Button>
          </Form.Group>
          {success ? (
            <Succes>
              Request sent succesfully.You will be contacted soon by us!
            </Succes>
          ) : undefined}
        </form>
      </Paper>
    </>
  );
}
