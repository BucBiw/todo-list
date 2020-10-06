const mongoose = require("mongoose");

const Item = mongoose.model(
  "Item",
  new mongoose.Schema({
    key: String,
    text: String,
    date: Date
  })
);

module.exports = Item;