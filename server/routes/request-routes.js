const router = require("express").Router();
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-handlebars");

// Step 1
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "chsubash333@gmail.com", // TODO: your gmail account
    pass: "khokho000", // TODO: your gmail password
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false,
  },
});

router.post("/", (req, res) => {
  console.log(req.body);
  transporter.use(
    "compile",
    hbs({
      viewEngine: {
        extName: ".handlebars",
        defaultLayout: false,
      },
      viewPath: "./views/",
    })
  );

  // Step 2
  let mailOptions = {
    from: "chsubash333@gmail.com", // TODO: email sender
    to: "subash.18cs@kct.ac.in", // TODO: email receiver
    subject: "New Boooking Request for Adithya Convention Centre",
    text: "Wooohooo it works!!",
    template: "index",
    context: {
      ...req.body,
      hallText: req.body.halls.join(" , "),
    },
  };

  // Step 3
  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      return res.send({
        err,
      });
    } else {
      const Request = require("../models/requests-model");
      new Request({
        ...req.body,
      })
        .save()
        .then((data) => {
          return res.send({ msg: "email sent", req: { ...data } });
        })
        .catch((err) => {
          return res.send({ msg: "email sent" });
        });
    }
  });
});

router.post("/sendmessage", (req, res) => {
  transporter.use(
    "compile",
    hbs({
      viewEngine: {
        extName: ".handlebars",
        defaultLayout: false,
      },
      viewPath: "./views/",
    })
  );

  // Step 2
  let mailOptions = {
    from: "chsubash333@gmail.com", // TODO: email sender
    to: "subash.18cs@kct.ac.in", // TODO: email receiver
    subject: "New Message for Adithya Convention Centre",
    text: "Wooohooo it works!!",
    template: "message",
    context: {
      ...req.body,
    },
  };

  // Step 3(

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      return res.send({
        err,
      });
    } else {
      res.send({ msg: "email sent", req: { ...data } });
    }
  });
});
module.exports = router;
