const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  dates: {
    type: [String],
    default: "",
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
  booked: {
    type: Date,
    default: Date.now(),
  },
  email: { type: String, default: "" },
});

const Book = mongoose.model("bookedDates", bookSchema);

module.exports = Book;
