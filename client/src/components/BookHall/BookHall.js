import React, { useState } from "react";
import axios from "axios";
import { rangeOfDates } from "../../common/functions";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Switch from "@material-ui/core/Switch";
import Collapse from "@material-ui/core/Collapse";
import { Form, Col, Row } from "react-bootstrap";
import {
  FormControlLabel,
  Checkbox,
  TextField,
  TextareaAutosize,
} from "@material-ui/core";
import "react-phone-number-input/style.css";
import MuiPhoneInput from "material-ui-phone-number";

export default function Booking() {
  const [checked, setChecked] = React.useState(false);
  const [from, setFrom] = useState(new Date());
  const [to, setTo] = useState(checked ? new Date() : from);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [event, setEvent] = useState("");
  const [address, setAddress] = useState("");
  const [no, setNo] = useState("");
  const [halls, setHalls] = useState([]);

  function submitHandler(e) {
    e.preventDefault();
    console.log(
      rangeOfDates(from.setUTCHours(0, 0, 0, 0), to.setUTCHours(0, 0, 0, 0))
    );
    axios
      .post(process.env.REACT_APP_BACKEND_URL + "/api/book", {
        dates: rangeOfDates(
          from.setUTCHours(0, 0, 0, 0),
          to.setUTCHours(0, 0, 0, 0)
        ),
        name,
        email,
        event,
        address,
        no,
        halls,
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
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
  };

  const handleChange = () => {
    setChecked((prev) => !prev);
  };
  return (
    <form onSubmit={(e) => submitHandler(e)}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label={checked ? "From :" : "Choose Date"}
          format="dd/MM/yyyy"
          value={from}
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
      <Form.Group as={Row}>
        <Form.Label className="label" column sm="6">
          Full Name:
        </Form.Label>
        <Col sm="6">
          <TextField value={name} onChange={(e) => setName(e.target.value)} />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label className="label" column sm="6">
          Email:
        </Form.Label>
        <Col sm="6">
          <TextField value={email} onChange={(e) => setEmail(e.target.value)} />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-0">
        <Form.Label className="label" column sm="6">
          Choose Halls:
        </Form.Label>
        <Col sm="6">
          <FormControlLabel
            control={
              <Checkbox value="Hall-1" onChange={hallHandler} color="primary" />
            }
            label="Hall-1"
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-0">
        <Form.Label className="label" column sm="6"></Form.Label>
        <Col sm="6">
          <FormControlLabel
            control={
              <Checkbox value="Hall-2" onChange={hallHandler} color="primary" />
            }
            label="Hall-2"
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-0">
        <Form.Label className="label" column sm="6"></Form.Label>
        <Col sm="6">
          <FormControlLabel
            control={
              <Checkbox value="Hall-3" onChange={hallHandler} color="primary" />
            }
            label="Hall-3"
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-0">
        <Form.Label className="label" column sm="6"></Form.Label>
        <Col sm="6">
          <FormControlLabel
            control={
              <Checkbox value="Hall-4" onChange={hallHandler} color="primary" />
            }
            label="Hall-4"
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label className="label" column sm="6">
          Event:
        </Form.Label>
        <Col sm="6">
          <TextField
            value={event}
            onChange={(e) => setEvent(e.target.value)}
            helperText="eg:Marriage,birthday party etc.."
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label className="label" column sm="6">
          Address:
        </Form.Label>
        <Col sm="6">
          <TextareaAutosize
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rowsMin={4}
            cols="45"
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label className="label" column sm="6">
          Contact number :
        </Form.Label>
        <Col sm="6">
          <MuiPhoneInput
            defaultCountry="in"
            value={no}
            onChange={(e) => setNo(e)}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <input type="submit" value="Book" />
      </Form.Group>
    </form>
  );
}
