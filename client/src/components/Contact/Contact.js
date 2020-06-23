import React, { useContext } from "react";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import MuiPhoneInput from "material-ui-phone-number";
import { Button } from "@material-ui/core";
import Success from "../../common/SuccessAlert";
import { AuthContext } from "../../contexts/authContext";
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  paper: {
    width: "90%",
    minWidth: "320px",
    margin: "auto",
    maxWidth: "650px",
    padding: "3rem",
    marginTop: "5rem",
  },
  heading: {
    textAlign: "center",
    color: theme.palette.primary.main,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    margin: "2rem 0",
  },
}));

export default function Contact() {
  const classes = useStyles();
  const [message, setMessage] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [no, setNo] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const { setOpen } = useContext(AuthContext);
  const submitHandler = () => {
    setSuccess(false);
    setOpen(true);
    axios
      .post(process.env.REACT_APP_BACKEND_URL + "/api/request/sendmessage", {
        name,
        email,
        message,
        no,
      })
      .then((res) => {
        setOpen(false);
        console.log(res.data);
        if (res.status === 200) {
          setSuccess(true);
        }
      })
      .catch((err) => {
        setOpen(false);
        if (err.response) {
          console.log(err.response.data);
        } else {
          console.log(err);
        }
      });
  };

  return (
    <Paper data-aos="flip-left" elevation={3} className={classes.paper}>
      <h3 className={classes.heading}>Let's Talk</h3>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={classes.input}
          label="Name"
        />
        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={classes.input}
          label="Email"
        />
        <TextareaAutosize
          style={{ padding: "0.5rem" }}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rowsMin={7}
          color="primary"
          cols="45"
          className={classes.input}
          placeholder="Write your message here"
        />
        <MuiPhoneInput
          className={classes.input}
          defaultCountry="in"
          value={no}
          onChange={(e) => setNo(e)}
        />
        <Button
          style={{ marginBottom: "2rem" }}
          onClick={submitHandler}
          variant="contained"
          color="primary"
        >
          Send
        </Button>
        {success ? (
          <Success>
            Message sent Successfully.You will be contacted soon!
          </Success>
        ) : undefined}
      </form>
    </Paper>
  );
}
