const { BCRYPT_WORK_FACTOR } = require("../config");
const db = require("../db");
const bcrypt = require("bcrypt");

async function commonBeforeAll() {
  await db.query("DELETE FROM users");

  await db.query(
    `INSERT INTO users (name, lastname, username, password, email)
     VALUES ("U1F", "U1L", "U1", $1, "user1@gmail.com"),
     ("U2F", "U2L", "U2", $2, "user2@yahoo.com")`,
      [ await bcrypt.hash("password1", BCRYPT_WORK_FACTOR), 
      await bcrypt.hash("password2", BCRYPT_WORK_FACTOR)]);
}


async function commonBeforeEach() {
  await db.query("BEGIN");
}

async function commonAfterEach() {
  await db.query("ROLLBACK")
}

async function commonAfterAll() {
  await db.end()
}


module.exports = {commonBeforeAll, commonAfterAll, commonBeforeEach, commonAfterEach}