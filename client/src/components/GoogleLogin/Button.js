import React, { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/authContext";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import "./Button.css";

export default function Button(props) {
  const {
    isAuthenticated,
    setIsAuthenticated,
    setType,
    setUsername,
    setOpen,
  } = useContext(AuthContext);

  const login = (response) => {
    setOpen(true);
    if (response.profileObj) {
      axios
        .post(process.env.REACT_APP_BACKEND_URL + "/auth", {
          email: response.profileObj.email,
          name: response.profileObj.name,
          id: response.profileObj.googleId,
        })
        .then((res) => {
          var auth = true;
          localStorage.setItem("authkey", auth);
          setOpen(false);
          setIsAuthenticated(true);
          setType(res.data._doc.type);
          setUsername(res.data._doc.username);
        })
        .catch((err) => {
          setOpen(false);
          setIsAuthenticated(false);
        });
    } else {
      setOpen(false);
      console.log(response);
    }
  };

  const logout = () => {
    setOpen(true);
    setIsAuthenticated(false);
    setType("");
    setUsername("");
    localStorage.removeItem("authkey");
    setOpen(false);

    window.location = "?logout=success";
  };

  if (isAuthenticated) {
    return (
      <GoogleLogout
        clientId="558250457328-567guikhqmfiq22k6jrfcobmbnusjjfm.apps.googleusercontent.com"
        buttonText="Logout"
        onLogoutSuccess={logout}
        render={(renderProps) => (
          <button
            className="gbtn "
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            Sign Out
          </button>
        )}
      ></GoogleLogout>
    );
  } else {
    return (
      <GoogleLogin
        clientId="558250457328-567guikhqmfiq22k6jrfcobmbnusjjfm.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={login}
        onFailure={login}
        cookiePolicy={"single_host_origin"}
        render={(renderProps) => (
          <button
            className="gbtn"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            Sign In
          </button>
        )}
      />
    );
  }
}
