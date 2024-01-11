const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const jsonSchema = require("jsonschema");
const userSchema = require("../schemas/newUser.json");
const { BadRequestError } = require("../expressError");
const {createToken} = require("../helpers/tokens");
const loginSchema = require("../schemas/login.json");
const { authenticateJWT } = require("../middlewares/auth");


router.post("/login", authenticateJWT, async function(req, res, next) {
  try {
    // console.log(req.body)
    const validator = jsonSchema.validate(req.body, loginSchema);
    if(!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }
    const {username, password} = req.body;
    const user = await User.authenticate(username, password);
    const token = createToken(user);
    return res.json({token})
  }catch(err){
    return next(err)
  }
});



router.post("/register", async function(req, res, next) {
  try{
    const validator = jsonSchema.validate(req.body, userSchema);
    if(!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }
    const user = await User.register({...req.body});
    const token = createToken(user)
    return res.status(201).json({ token })
  }catch(err) {
    return next(err)
  }
})

// to create middleware routes
module.exports = router;