const assert = require("assert");
const { expect } = require("chai");
const axios = require("axios");
require("dotenv").config({ path: __dirname + "/.env" });

var _history = {};

describe("API should be working.", () => {
  it("Should have the API hosted on port 8000", async () => {
    const { status, data } = await axios.get(`${process.env.API_URL}`);
    assert(status, 200);
    assert(data.status, "Success");
  });
});

describe("POST /bill should work", () => {
  it("Should not create a bill with empty body/request fields", async () => {
    const bill = {};
    axios
      .post(`${process.env.API_URL}bill`, bill)
      .then((response) => {})
      .catch((err) => {
        assert(err.response.status, 422);
        assert(err.response.data.error, "Missing required field/fields.");
      });
  });
  it("Should create a bill with a provided fields.", async () => {
    const bill = {
      billDate: new Date(),
      paidDate: new Date(),
      unitsConsumed: 5,
      amount: 600,
    };
    const { status, data } = await axios.post(
      `${process.env.API_URL}bill`,
      bill
    );
    assert(status, 201);
    assert(data.status, "Success");
    assert(
      new Date(data.__data.billDate).getTime(),
      new Date(bill.billDate).getTime()
    );
    assert(
      new Date(data.__data.paidDate).getTime(),
      new Date(bill.paidDate).getTime()
    );
    assert(data.__data.unitsConsumed, bill.unitsConsumed);
    assert(data.__data.amount, bill.amount);
    _history._id = data.__data._id;
  }).timeout(3000);
});

describe("GET /bill should work", async () => {
  it("Should get all the bills", async () => {
    const { status, data } = await axios.get(`${process.env.API_URL}bill`);
    assert(status, 200);
    assert(data.status, "Success");
    expect(data.__data.length).to.be.greaterThan(0);
  }).timeout(3000);
});

describe("GET /bill/:id should work", async () => {
  it("Should get the bill with the stored id", async () => {
    const { status, data } = await axios.get(
      `${process.env.API_URL}bill/${_history._id}`
    );
    assert(status, 200);
    assert(data.status, "Success");
    expect(data.__data).to.not.be.equal({});
  }).timeout(3000);
  it("Should return NotFound with the invalid id to get a bill", async () => {
    axios
      .get(`${process.env.API_URL}bill/62d5749eebee6cb82dce8ddd`)
      .then((response) => {
        assert(response.status, 404);
        assert(response.data.status, "Failed");
      });
  }).timeout(3000);
});

describe("PUT /bill/:id should work", async () => {
  it("Should update the bill with the stored id", async () => {
    const { status, data } = await axios.put(
      `${process.env.API_URL}bill/${_history._id}`,
      { amount: 100 }
    );
    assert(status, 200);
    assert(data.status, "Success");
    assert(data.__data.amount, 100);
  }).timeout(3000);
  it("Should return error when bill with the invalid id, is being updated", () => {
    axios
      .put(`${process.env.API_URL}bill/62d5749eebee6cb82dce8ddd`, {
        amount: 100,
      })
      .then((response) => {})
      .catch((err) => {
        assert(err.response.status, 404);
        assert(err.response.data.status, "Failed");
        assert(err.response.data.__data, null);
      });
  }).timeout(3000);
});

describe("DELETE /bill/:id should work", () => {
  it("Should delete the bill with the stored id", async () => {
    const { status, data } = await axios.delete(
      `${process.env.API_URL}bill/${_history._id}`
    );
    assert(status, 204);
  }).timeout(3000);
  it("Should return error when deleting the bill with an invalid id", () => {
    axios
      .delete(`${process.env.API_URL}bill/62d5749eebee6cb82dce8ddd`)
      .then((response) => {})
      .catch((err) => {
        assert(err.response.status, 404);
        console.log(err.response.data);
      });
  }).timeout(3000);
});
