import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContext } from "./contexts/authContext";
import Navbar from "./components/Header/Navbar";
import { Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Booking from "./components/Booking/Booking";
import Contact from "./components/Contact/Contact";
import Gallery from "./components/Gallery/Gallery";
import Dashboard from "./components/Dashboard/Dashboard";
import BookForm from "./components/Booking/Book-form";
import history from "./common/history";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./common/theme";
import Footer from "./components/Footer/Footer";
import BackDrop from "./common/Backdrop";
import aos from "aos";

const App = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const navbar = isAuthenticated ? (
    <Navbar
      items={[
        "home",
        "about us",
        "contact us",
        "gallery",
        "booking",
        "dashboard",
      ]}
    />
  ) : (
    <Navbar items={["home", "about us", "contact us", "gallery", "booking"]} />
  );
  const dashboard = isAuthenticated ? (
    <Route exact path="/dashboard" component={Dashboard} />
  ) : undefined;

  React.useEffect(() => {
    var auth = localStorage.getItem("authkey");
    setIsAuthenticated(auth);

    aos.init({
      duration: 800,
      // once: true,
      delay: 500,
    });
  });

  return (
    <ThemeProvider theme={theme}>
      <BackDrop />
      <Router history={history}>
        <Switch>
          <Route exact path="/">
            {navbar}
            <Home isAuth={isAuthenticated} />
          </Route>
          <Route exact path="/home">
            {navbar}
            <Home isAuth={isAuthenticated} />
          </Route>
          <Route exact path="/about">
            {navbar}
            <About />
          </Route>
          <Route exact path="/booking">
            {navbar}
            <Booking />
          </Route>
          <Route exact path="/contact">
            {navbar}
            <Contact />
          </Route>
          <Route exact path="/gallery">
            {navbar}
            <Gallery />
          </Route>
          <Route exact path="/booking-form" component={BookForm} />
          {dashboard}
        </Switch>
        <Footer />
      </Router>
    </ThemeProvider>
  );
};
export default App;
