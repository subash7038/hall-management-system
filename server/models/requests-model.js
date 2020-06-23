const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reqSchema = new Schema({
  dates: {
    type: [String],
  },
  name: {
    type: String,
    default: "",
  },
  address: { type: String, default: "" },
  event: { type: String, default: "" },
  cateror: { type: String, default: "" },
  no: { type: String, default: "" },
  amount: { type: String, default: "" },
  halls: {
    type: [String],
    default: "",
  },
  status: {
    type: String,
    default: "pending",
  },
  requested: {
    type: Date,
    default: Date.now(),
  },
  email: { type: String, default: "" },
});

const Requests = mongoose.model("requesteddates", reqSchema);

module.exports = Requests;
