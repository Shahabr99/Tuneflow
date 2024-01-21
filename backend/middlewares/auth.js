const jwt = require("jsonwebtoken");
const {SECRET_KEY} = require("../config");
const {UnauthorizedError} = require("../expressError");

function authenticateJWT(req, res, next) {
  try {
    const authHeader =  req.headers.authorization;
    if(authHeader) {
      const token = authHeader.replace(/^[Bb]earer /, "").trim();
      res.locals.user = jwt.verify(token, SECRET_KEY);
    }
    return next()
  }catch(err){
    return next(err)
  }
}


function ensureLoggedIn(req, res, next) {
  try {
    if(!res.locals.user) throw new UnauthorizedError("Access denied!")
    return next()
  }catch(err){
    return next(err)
  }
}


module.exports = {authenticateJWT, ensureLoggedIn};