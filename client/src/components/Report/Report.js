import React, { useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { rangeOfDates } from "../../common/functions";
import { makeStyles, Paper, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  report: {
    minHeight: "80vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "800px",
    margin: "auto",
  },
  heading: {
    textAlign: "center",
    color: theme.palette.primary.main,
    fontWeight: "bold",
    margin: "2rem 0",
  },
  textField: {
    width: "50%",
    maxWidth: "500px",
  },
}));

const App = () => {
  const [from, setFrom] = useState(new Date());
  const [to, setTo] = useState(new Date());
  const classes = useStyles();

  const createAndDownloadPdf = () => {
    console.log(
      rangeOfDates(from.setUTCHours(0, 0, 0, 0), to.setUTCHours(0, 0, 0, 0))
    );
    axios
      .post(process.env.REACT_APP_BACKEND_URL + "/api/admin/create-pdf", {
        dates: rangeOfDates(from, to),
      })
      .then(() =>
        axios.get(process.env.REACT_APP_BACKEND_URL + "/fetch-pdf", {
          responseType: "blob",
        })
      )
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });

        saveAs(pdfBlob, "newPdf.pdf");
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data);
        } else {
          console.log(err);
        }
      });
  };

  return (
    <Paper elevation={3} className={classes.report}>
      <h3 className={classes.heading}>Report </h3>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          className={classes.textField}
          margin="normal"
          label="From"
          format="dd/MM/yyyy"
          value={from}
          onChange={(e) => setFrom(e)}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
        <KeyboardDatePicker
          className={classes.textField}
          margin="normal"
          label="To"
          format="dd/MM/yyyy"
          value={to}
          onChange={(e) => setTo(e)}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </MuiPickersUtilsProvider>
      <Button
        variant="contained"
        color="primary"
        onClick={createAndDownloadPdf}
      >
        Download PDF
      </Button>
    </Paper>
  );
};

export default App;
