const router = require("express").Router();
const Book = require("../models/book-model");

router.get("/", (req, res) => {
  res.send({
    msg: "Works",
  });
});

router.post("/", (req, res) => {
  new Book({
    dates: req.body.dates,
    name: req.body.name,
    address: req.body.address,
    event: req.body.event,
    no: req.body.no,
    halls: req.body.halls,
  })
    .save()
    .then((bookeddate) => {
      res.send(bookeddate);
    })
    .catch((err) => console.log("ERror at Booking route", err));
});

router.post("/check", (req, res) => {
  Book.find()
    .then((item) => {
      let dates = item.map((data) => {
        return data.dates;
      });

      var merged = [].concat.apply([], dates);
      res.send({
        bookedDates: [...new Set(merged)],
      });
    })
    .catch((err) => {
      console.log("error at check availability routes", err);
    });
});

module.exports = router;
