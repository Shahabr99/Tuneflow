// get data from the dotenv files if exists
require("dotenv").config();
require("colors");

const SECRET_KEY = process.env.SECRET_KEY || "webdev-secret-agent";
const PORT = +process.env.PORT || 3001;

function getDatabase() {
  return process.env.NODE_ENV === "test" ? "postgres:///tuneflow_test" : process.env.DATABASE_URL || "postgres:///tuneflow";
}

const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;
const key = process.env.KEY;
const client = process.env.SECRET_CLIENT


module.exports = {SECRET_KEY, PORT, getDatabase, BCRYPT_WORK_FACTOR, key, client}