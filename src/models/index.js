// const { v4: uuid } = require('uuid');
// class Bill {
//   constructor(billDate, paidDate, unitsConsumed, amount) {
// 	this.billDate = billDate;
// 	this.paidDate = paidDate;
// 	this.unitsConsumed = unitsConsumed;
// 	this.amount = amount;
// 	// this.created_at = new Date().getTime();
// 	// this.updated_at = new Date().getTime();
//   }

//   create() {

//   }
//   static read() {

//   }
//   static update() {

//   }
//   static delete() {

//   }
// }

// module.exports = Bill;
const Bill = require("./Bill");
module.exports = {
  Bill,
};
