import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import GoogleLogin from "../GoogleLogin/Button";
import SideBar from "./Sidebar";
import "./navbar.css";
import { withRouter } from "react-router-dom";
//material ui
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Zoom from "@material-ui/core/Zoom";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  AppBar: {
    height: "6rem",
    padding: "1rem 0",
    [theme.breakpoints.down("xs")]: {
      height: "4rem",
      padding: "0.5rem",
    },
  },
  appbarBottom: {
    minHeight: 0,
    [theme.breakpoints.down("sm")]: {
      height: "6rem",
    },
    [theme.breakpoints.down("xs")]: {
      height: "4rem",
    },
  },
  appbarBottom2: {
    minHeight: "7rem",
    [theme.breakpoints.down("sm")]: {
      height: "6rem",
    },

    [theme.breakpoints.down("xs")]: {
      height: "4rem",
    },
  },

  root: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  logoContainer: {
    height: "4rem",
    [theme.breakpoints.down("md")]: {
      height: "3rem",
    },
    [theme.breakpoints.down("xs")]: {
      height: "2.5rem",
    },
  },
  tab: {
    minWidth: 10,
    color: "#111",
    fontSize: "0.9rem",
    height: "6rem",
    marginRight: 25,
    textTransform: "none",
    fontStyle: "bold",
    fontWeight: 900,
    textShadow: " 2px 2px 5px #fff",

    "&:hover": {
      textDecoration: "none",
      color: theme.palette.primary.main,
      fontWeight: 400,
    },
  },
  indicator: {
    background: "transparent",
  },
  indicator2: {
    background: theme.palette.primary.main,
  },
  tabs: {
    marginLeft: "auto",
    textDecoration: "none",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
    appbarBottom2: {
      height: 0,
    },
  },
}));

function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();

  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,

  window: PropTypes.func,
};

function Navbar(props) {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const [value, setValue] = useState(0);
  const [home, setHome] = useState(
    props.location.pathname === "/" || props.location.pathname === "/home"
  );
  const scrollHandler = () => {
    if (
      value === 0 &&
      window.pageYOffset < 150 &&
      (window.location.pathname === "/" || window.location.pathname === "/home")
    ) {
      setHome(true);
    } else {
      setHome(false);
    }
  };

  useEffect(() => {
    if (
      value === 0 &&
      window.pageYOffset < 150 &&
      (window.location.pathname === "/" || window.location.pathname === "/home")
    ) {
      setHome(true);
    } else {
      setHome(false);
    }
    if (window.location.pathname === "/" && value !== 0) {
      setValue(0);
    } else if (window.location.pathname === "/about" && value !== 1) {
      setValue(1);
    } else if (window.location.pathname === "/contact" && value !== 2) {
      setValue(2);
    } else if (window.location.pathname === "/gallery" && value !== 3) {
      setValue(3);
    } else if (window.location.pathname === "/booking" && value !== 4) {
      setValue(4);
    } else if (window.location.pathname === "/home" && value !== 0) {
      setValue(0);
    } else if (window.location.pathname === "/booking-form" && value !== 4) {
      setValue(4);
    }
    window.addEventListener("scroll", scrollHandler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, home]);

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        id="navbar"
        className={classes.AppBar}
        color={home && !matches ? "transparent" : "secondary"}
        elevation={home && !matches ? 0 : 6}
      >
        <Toolbar disableGutters>
          <Link to="/">
            <img
              className={classes.logoContainer}
              alt="logo"
              src={require("../../img/logo.png")}
            />
          </Link>
          {matches ? (
            <SideBar setValue={setValue} list={props.items} />
          ) : undefined}
          <Tabs
            value={value}
            className={classes.tabs}
            classes={{
              indicator: home ? classes.indicator : classes.indicator2,
            }}
          >
            {props.items.map((item, i) => {
              return (
                <Tab
                  onClick={() => {
                    setValue(i);
                  }}
                  disableRipple
                  className={classes.tab}
                  label={item.charAt(0).toUpperCase() + item.slice(1)}
                  component={Link}
                  to={item.split(" ")[0]}
                  key={item}
                />
              );
            })}
            <GoogleLogin />
          </Tabs>
        </Toolbar>
      </AppBar>
      <Toolbar
        className={home ? classes.appbarBottom : classes.appbarBottom2}
        id="back-to-top-anchor"
      />
      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
}

export default withRouter(Navbar);
