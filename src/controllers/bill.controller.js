const { Bill } = require("../models");

module.exports = {
  getBills: async (req, res, next) => {
    try {
      const bills = await Bill.find();
      return res.status(200).json({ status: "Success", __data: bills });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
  getBill: async (req, res, next) => {
    try {
      const billID = req.params.id;
      if (billID.length != 24)
        return res.status(404).json({ status: "Failed", __data: null });
      else {
        const bill = await Bill.findById(billID);
        if (bill)
          return res.status(200).json({ status: "Success", __data: bill });
        else return res.status(404).json({ status: "Failed", __data: null });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
  createBill: async (req, res, next) => {
    try {
      const requiredFields = [
        "billDate",
        "paidDate",
        "unitsConsumed",
        "amount",
      ];
      if (
        requiredFields.filter((rf) => Object.keys(req.body).includes(rf))
          .length < 4
      )
        return res
          .status(422)
          .json({ error: "Missing required field/fields." });
      const bill = {
        billDate: req.body.billDate,
        paidDate: req.body.paidDate,
        unitsConsumed: req.body.unitsConsumed,
        amount: req.body.amount,
      };
      const _bill = new Bill(bill);
      await _bill.save();
      return res.status(201).json({ status: "Success", __data: _bill });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
  updateBill: async (req, res, next) => {
    try {
      const requiredFields = [
        "billDate",
        "paidDate",
        "unitsConsumed",
        "amount",
      ];
      const billID = req.params.id;
      if (billID.length != 24 || Object.keys(req.body).length === 0)
        return res.status(404).json({ status: "Failed", __data: null });
      const update = {};
      requiredFields.map((rf) => {
        if (Object.keys(req.body).includes(rf)) update[rf] = req.body[rf];
      });
      let _bill = await Bill.findOneAndUpdate({ _id: billID }, update);
      if (_bill) {
        _bill = { ..._bill._doc, ...update };
        return res.status(200).json({ status: "Success", __data: _bill });
      } else return res.status(404).json({ status: "Failed", __data: null });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
  deleteBill: async (req, res, next) => {
    try {
      const billID = req.params.id;
      if (billID.length != 24)
        return res.status(404).json({ status: "Failed", __data: null });
      const bill = await Bill.findByIdAndDelete(billID);
      return res.status(204).json({ status: "Success" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
