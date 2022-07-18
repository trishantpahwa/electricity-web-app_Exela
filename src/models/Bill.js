const { Schema, model } = require("mongoose");

const Bill = new Schema({
  billDate: { type: Date },
  paidDate: { type: Date },
  unitsConsumed: { type: Number },
  amount: { type: Number },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = model("Bill", Bill);
