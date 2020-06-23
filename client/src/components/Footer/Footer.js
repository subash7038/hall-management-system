import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: "#424242",
    minWidth: "350px",

    // backgroundImage: "linear-gradient(0deg, #e0e0e0, #fff)",
    color: "#fff",
    marginTop: "5rem",
    padding: "2rem 1rem 0 1rem",
  },
  heading: {
    color: theme.palette.primary.main,
  },
  footerLink: {
    textDecoration: "none",
    color: "#fff",
    "&:hover": {
      color: "#fff",
    },
  },
  left: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  ul: {
    padding: 0,
  },
  icons: {
    [theme.breakpoints.down("sm")]: {
      maxHeight: "2rem",
    },
  },
}));

const FooterPage = () => {
  const classes = useStyles();
  return (
    <MDBFooter className={classes.footer}>
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="6" className={classes.left}>
            <h5 style={{ textAlign: "center" }} className={classes.heading}>
              Adithya Convention Center
            </h5>
            <div style={{ textAlign: "center" }}>
              <p>
                SF No. 368/1,Thudiyalur Road,Saravanmpatty,
                <br />
                Coimbatore-641 035,
                <br />
                Tamil Nadu,
                <br />
                India,
                <br />
                Contact:+91 98422 13906 <br />
                email:adithyaconventioncentre@gmail.com
              </p>
            </div>
          </MDBCol>
          <MDBCol md="6" className={classes.left}>
            <h5 className="title">Follow us</h5>
            <ul className={classes.ul}>
              <li className="list-unstyled">
                <a href="#!">
                  <img
                    className={classes.icons}
                    src={require("../../img/facebook.svg")}
                    alt="facebook"
                  />
                </a>
              </li>
              <li className="list-unstyled">
                <a href="#!">
                  {" "}
                  <img
                    className={classes.icons}
                    src={require("../../img/instagram.svg")}
                    alt="facebook"
                  />
                </a>
              </li>
              <li className="list-unstyled">
                <a href="#!">
                  {" "}
                  <img
                    className={classes.icons}
                    src={require("../../img/whatsapp.svg")}
                    alt="facebook"
                  />
                </a>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright:{" "}
          <a className={classes.footerLink} href="https://www.mdbootstrap.com">
            {" "}
            adithyaconventioncentre.com{" "}
          </a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
};

export default FooterPage;
