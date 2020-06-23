const express = require("express");
const cookieSession = require("cookie-session");
const authRoutes = require("./routes/auth-routes");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const app = express();
const bodyParser = require("body-parser");

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey],
  })
);

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  next();
});

mongoose
  .connect(process.env.MONGO || keys.mongodb.dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected db"))
  .catch(() => console.log("db not connected"));

app.use("/", authRoutes);
app.use("/api/admin", require("./routes/admin-routes"));
app.use("/api/book", require("./routes/booking-routes"));
app.use("/api/request", require("./routes/request-routes"));
app.get("/fetch-pdf", (req, res) => {
  res.sendFile(`${__dirname}/result.pdf`);
});

let port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("port = ", port);
});
