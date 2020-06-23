const router = require("express").Router();
const User = require("../models/user-model");
const Request = require("../models/requests-model");
const Book = require("../models/book-model");

const pdf = require("html-pdf");

const pdfTemplate = require("../documents");

router.post("/addadmin", (req, res) => {
  User.findOne({ email: req.body.email }).then((data) => {
    if (data) {
      res.status(400).send({ msg: "Already exists", data: data });
    } else {
      new User({
        email: req.body.email,
        type: req.body.type,
      })
        .save()
        .then((newUser) => {
          res.send(newUser);
        });
    }
  });
});

router.get("/requests", (req, res) => {
  Request.find({ status: "pending" })
    .then((data) => {
      res.send({ requests: data });
    })
    .catch((err) => {
      res.status(400).send({
        msg: "Failed",
        error: err,
      });
    });
});

router.post("/accept", (req, res) => {
  function _objectWithoutProperties(obj, keys) {
    var target = {};
    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }
    return target;
  }
  new Book({ ..._objectWithoutProperties(req.body, ["_id"]) })
    .save()
    .then((data) => {
      Request.findOneAndUpdate(
        { _id: req.body._id },
        {
          $set: {
            status: "accepted",
          },
        },
        { new: true }
      )
        .then((result) => {
          res.send({
            ...result,
          });
        })
        .catch((err) => console.log("ERRor :", err));
    })
    .catch((err) => console.log("ERRor :", err));
});

router.post("/deny", (req, res) => {
  Request.findOneAndUpdate(
    { _id: req.body._id },
    {
      $set: {
        status: "denied",
      },
    },
    { new: true }
  )
    .then((result) => {
      res.send({
        ...result,
      });
    })
    .catch((err) => console.log("ERRor :", err));
});

var findOne = function (haystack, arr) {
  return arr.some(function (v) {
    return haystack.indexOf(v) >= 0;
  });
};
let result;
router.post("/create-pdf", (req, res) => {
  Book.find()
    .then((data) => {
      result = data.filter((item) => {
        return findOne(item.dates, req.body.dates);
      });
    })
    .then(() => {
      if (result.length > 0) {
        pdf
          .create(
            pdfTemplate({
              result,
            }),
            {}
          )
          .toFile("result.pdf", (err) => {
            if (err) {
              res.send(Promise.reject());
            }

            res.send(Promise.resolve());
          });
      } else {
        res.status(400).send({
          msg: "No records found",
        });
      }
    });
});

module.exports = router;
