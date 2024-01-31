const jwt = require("jsonwebtoken");
const {SECRET_KEY} = require("../config")



function createToken(user) {
  let payload = {
    username: user.username
  }
  console.log(user.username)
  const token = jwt.sign(payload, SECRET_KEY);
  console.log(token)
  return token;
}



module.exports = {createToken};