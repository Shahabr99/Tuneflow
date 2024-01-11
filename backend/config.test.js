"use strict"

describe("gets data from process.env", function() {

  process.env.PORT = "5001";
  process.env.SECRET_KEY = "WEBDEVBOY";
  process.env.NODE_ENV = "other";
  process.env.DATABASE_URL = "other";

  const config = require("./config");
  expect(config.PORT).toEqual("5001");
  expect(config.SECRET_KEY).toEqal("WEBDEVBOY");
  expect(config.getDatabase()).toEqual("other");
  expect(config.BCRYPT_WORK_FACTOR).toEqual(12);

  delete process.env.NODE_ENV;
  delete process.env.PORT;
  delete process.env.SECRET_KEY;
  delete process.env.BCRYPT_WORK_FACTOR;

  expect(config.getDatabase()).toEqual("tuneFlow");
  process.env.NODE_ENV = "test";
  expect(config.getDatabase()).toEqual("tuneFlow-test");
})