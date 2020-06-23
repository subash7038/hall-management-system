import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { Paper, IconButton, Collapse } from "@material-ui/core";
import { formatDate } from "../../common/functions";
import { AuthContext } from "../../contexts/authContext";
import DeleteIcon from "@material-ui/icons/Delete";
import InfoIcon from "@material-ui/icons/Info";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  heading: {
    textAlign: "center",
    color: theme.palette.primary.main,
    fontWeight: "bold",
    margin: "3rem 0 ",
  },
  paper: {
    width: "98%",
    minWidth: "280px",
    margin: "auto",
    maxWidth: "850px",
    padding: "1rem 0.5rem",
    marginTop: "3rem",
    display: "flex",
    flexDirection: "column",

    alignItems: "center",
    minHeight: "80vh",
    [theme.breakpoints.down("sm")]: {
      // width: "100%",
    },
  },

  smalldetails: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",

    alignItems: "center",
  },
  text: {
    width: "70%",
    marginRight: "auto",
    fontSize: "1rem",
    padding: "1rem 1rem",
  },
  innerPaper: {
    width: "95%",
    margin: "1rem",
  },
  bigDetails: {
    margin: "auto",
    marginBottom: "1rem",
    width: "95%",

    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  details: {
    display: "flex",
    margin: "1rem",
    fontSize: "1rem",
  },
  label: {
    color: "green",
    fontWeight: "bold",
    letterSpacing: "1px",
  },
  detail: {
    color: "red",
    fontWeight: "bold",
    letterSpacing: "1px",
    marginLeft: "4px",
  },

  button: {
    width: "30%",

    display: "flex",
    justifyContent: "space-between",
    margin: "0 12px",
  },
}));

export default function Requests() {
  const classes = useStyles();
  const [requests, setRequests] = useState([]);
  const { setOpen } = React.useContext(AuthContext);
  const [index, setIndex] = useState(0);
  const [successSnackbar, setSuccessSnackbar] = useState(false);
  const [failureSnackbar, setfailureSnackbar] = useState(false);

  function removeArrayElem(data) {
    let arr = [...requests];
    arr.splice(arr.indexOf(data), 1);
    return arr;
  }

  const acceptHandler = (e, data) => {
    setOpen(true);
    axios
      .post(process.env.REACT_APP_BACKEND_URL + "/api/admin/accept", {
        ...data,
      })
      .then((res) => {
        setRequests(removeArrayElem(res.data));
        setOpen(false);
        setSuccessSnackbar(true);
      })
      .catch((err) => {
        setOpen(false);
        console.log(err);
      });
  };

  const denyHandler = (e, data) => {
    setOpen(true);
    axios
      .post(process.env.REACT_APP_BACKEND_URL + "/api/admin/deny", {
        ...data,
      })
      .then((res) => {
        setOpen(false);
        setRequests(removeArrayElem(res.data));
        setfailureSnackbar(true);
      })
      .catch((err) => {
        setOpen(false);
        console.log(err);
      });
  };

  useEffect(() => {
    setOpen(true);
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/api/admin/requests")
      .then((res) => {
        setOpen(false);
        setRequests(res.data.requests);
      })
      .catch((err) => {
        setOpen(false);
        console.log(err);
      });

    // eslint-disable-next-line
  }, []);
  if (requests.length > 0) {
    return (
      <Paper elevation={3} className={classes.paper}>
        <h3 className={classes.heading}>Booking Requests</h3>
        {requests.map((data, i) => {
          console.log(data);
          return (
            <Paper elevation={3} key={i} className={classes.innerPaper}>
              <div className={classes.smalldetails}>
                <p className={classes.text}>
                  {data.name} requested {data.halls.join(",")} on
                  {" " + data.dates.map((item) => formatDate(item)).join(",")}
                </p>
                <div className={classes.button}>
                  <IconButton
                    onClick={(e) => acceptHandler(e, data)}
                    aria-label="delete"
                    className={classes.margin}
                  >
                    <CheckCircleIcon
                      fontSize="large"
                      style={{ color: "green" }}
                    />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    className={classes.margin}
                    onClick={(e) => denyHandler(e, data)}
                  >
                    <DeleteIcon fontSize="large" style={{ color: "red" }} />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    className={classes.margin}
                    onClick={(e) => {
                      if (index === i + 1) {
                        setIndex(0);
                      } else {
                        setIndex(i + 1);
                      }
                    }}
                  >
                    <InfoIcon fontSize="large" style={{ color: "#111" }} />
                  </IconButton>
                </div>
              </div>
              <Collapse
                className={classes.bigDetails}
                in={index === i + 1}
                component={Paper}
                elevation={3}
              >
                <div className={classes.details}>
                  <p className={classes.label}>Name :</p>
                  <p className={classes.detail}>{" " + data.name}</p>
                </div>
                <div className={classes.details}>
                  <p className={classes.label}>Requested Date(s) :</p>
                  <p className={classes.detail}>
                    {data.dates.map((item) => formatDate(item)).join(",")}
                  </p>
                </div>
                <div className={classes.details}>
                  <p className={classes.label}>Event :</p>
                  <p className={classes.detail}>{data.event}</p>
                </div>
                <div className={classes.details}>
                  <p className={classes.label}>Halls :</p>
                  <p className={classes.detail}>{data.halls.join(",")}</p>
                </div>
                <div className={classes.details}>
                  <p className={classes.label}>Address :</p>
                  <p className={classes.detail}>{data.address}</p>
                </div>
                <div className={classes.details}>
                  <p className={classes.label}>Email</p>
                  <p className={classes.detail}>{data.email}</p>
                </div>
                <div className={classes.details}>
                  <p className={classes.label}>Mobile no :</p>
                  <p className={classes.detail}>{data.no}</p>
                </div>
              </Collapse>
            </Paper>
          );
        })}
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
          <Alert onClose={() => setfailureSnackbar(false)} severity="success">
            Deleted successfully!
          </Alert>
        </Snackbar>
      </Paper>
    );
  } else {
    return (
      <Paper className={classes.paper}>
        <h1 style={{ marginTop: "10rem" }}>No results Found</h1>
      </Paper>
    );
  }
}
