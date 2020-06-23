const router = require("express").Router();
const User = require("../models/user-model");

router.get("/", (req, res) => {
  res.send({ msg: "works" });
});

router.post("/auth", (req, res) => {
  User.findOne({ email: req.body.email }).then((currentUser) => {
    if (!currentUser) {
      res.status(400).send({
        msg: "No user",
      });
    } else if (currentUser.email && currentUser.googleId) {
      // already have this user
      res.send({
        ...currentUser,
      });
    } else if (currentUser.email && !currentUser.googleId) {
      User.findOneAndUpdate(
        { email: currentUser.email },
        {
          $set: {
            googleId: req.body.id,
            username: req.body.name,
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
    } else {
      res.status(400).send({
        msg: "Unknown",
      });
    }
  });
});

module.exports = router;
