const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const jsonSchema = require("jsonschema");
const { BadRequestError } = require("../expressError");
const {createToken} = require("../helpers/tokens");
const userSchema = require("../schemas/newUser.json");
const loginSchema = require("../schemas/login.json")


// 
router.post("/login", async function(req, res, next) {
  try {
    const validator = jsonSchema.validate(req.body, loginSchema);
    
    if(!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }
    const {username, password} = req.body;
   
    const user = await User.authenticate(username, password);
    console.log(user)
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
    console.log(`${req.body}`)
    const user = await User.register({...req.body});
    console.log(`RECEIVED THIS USER ${user}`);
    const token = createToken(user);
    console.log(`CREATED TOKEN : ${token}`)
    return res.status(201).json({ token })
  }catch(err) {
    return next(err)
  }
})

// to create middleware routes
module.exports = router;