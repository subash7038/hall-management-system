import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { AuthContext } from "../contexts/authContext";

import Backdrop from "@material-ui/core/Backdrop";
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function Component() {
  const classes = useStyles();
  //   const [open, setOpen] = React.useState(false);
  const { open, setOpen } = React.useContext(AuthContext);
  return (
    <Backdrop
      className={classes.backdrop}
      open={open}
      onClick={() => setOpen(false)}
    >
      <CircularProgress color="primary" />
    </Backdrop>
  );
}
