import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { Paper, Button } from "@material-ui/core";
import { AuthContext } from "../../contexts/authContext";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  report: {
    minHeight: "80vh",
    display: "flex",
    flexDirection: "column",

    alignItems: "center",
    maxWidth: "800px",
    margin: "auto",
  },
  heading: {
    textAlign: "center",
    color: theme.palette.primary.main,
    fontWeight: "bold",
    margin: "4rem 0 0 0",
  },
  textField: {
    textAlign: "center",
    width: "100%",
    maxWidth: "500px",
    marginTop: "2rem",
  },
  form: {
    marginTop: "2rem",
    display: "flex",
    flexDirection: "column",
    width: "80%",
    maxWidth: "400px",
    margin: "auto",
  },
  button: {
    marginTop: "2rem",
  },
}));

export default function BasicTextFields() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const { setOpen } = React.useContext(AuthContext);
  const [successSnackbar, setSuccessSnackbar] = useState(false);
  const [failureSnackbar, setfailureSnackbar] = useState(false);

  const submitHandler = (e) => {
    setOpen(true);
    axios
      .post(process.env.REACT_APP_BACKEND_URL + "/api/admin/addadmin", {
        email,
        type,
      })
      .then((res) => {
        setOpen(false);
        setSuccessSnackbar(true);
        console.log(res.data);
      })
      .catch((err) => {
        setOpen(false);
        if (err.response) {
          setfailureSnackbar(true);
          console.log(err.response.data);
        } else {
          setOpen(false);

          console.log(err);
        }
      });

    console.log({
      email,
      type,
    });
  };

  return (
    <Paper elevation={3} className={classes.report}>
      <h3 className={classes.heading}>Report </h3>
      <form
        className={classes.form}
        onSubmit={submitHandler}
        noValidate
        autoComplete="off"
      >
        <TextField
          className={classes.textField}
          id="standard-basic"
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <TextField
          className={classes.textField}
          id="standard-basic"
          label="Standard"
          helperText="ex:Supervisor,Manager,etc.."
          value={type}
          onChange={(e) => setType(e.target.value.toLowerCase())}
        />
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={submitHandler}
        >
          Add admin
        </Button>
      </form>
      <Snackbar
        open={successSnackbar}
        autoHideDuration={6000}
        onClose={() => setSuccessSnackbar(false)}
      >
        <Alert onClose={() => setSuccessSnackbar(false)} severity="success">
          Successfully updated!
        </Alert>
      </Snackbar>
      <Snackbar
        open={failureSnackbar}
        autoHideDuration={6000}
        onClose={() => setfailureSnackbar(false)}
      >
        <Alert onClose={() => setfailureSnackbar(false)} severity="error">
          Email Already Exits!
        </Alert>
      </Snackbar>
    </Paper>
  );
}
