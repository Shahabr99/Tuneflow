const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const jsonSchema = require("jsonschema");
const { BadRequestError } = require("../expressError");
const {createToken} = require("../helpers/tokens");
const userSchema = require("../schemas/newUser.json");
const loginSchema = require("../schemas/login.json")


// Authentication based on username and password and returns token to frontend
router.post("/login", async function(req, res, next) {
  try {
    
    // Checks to see if the data received matches oour JSON schema
    const validator = jsonSchema.validate(req.body, loginSchema);
    
    if(!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const {username, password} = req.body;
   
    // checks if the username and password are valid
    const user = await User.authenticate(username, password);

    // Creates a token based on 
    const token = createToken(user);
    
    return res.json({token})
  }catch(err){
    return next(err)
  }
});


// 
router.post("/register", async function(req, res, next) {
  try{
    const validator = jsonSchema.validate(req.body, userSchema);
    if(!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }
    
    // adds the user's information to database
    const user = await User.register({...req.body});
    
    const token = createToken(user);
    
    return res.status(201).json({ token })
  }catch(err) {
    return next(err)
  }
})

// to create middleware routes
module.exports = router;