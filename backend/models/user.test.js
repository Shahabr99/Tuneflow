const {commonBeforeAll, commonBeforeEach, commonAfterEach, commonAfterAll} = require("./commonTest");
const User = require("./newUser");
const {BadRequestError, NotFoundError, UnauthorizedError, ForbiddenError} = require("../expressError")
// TODO Incomeplete test file. Add more test...
beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);


describe("registration", function() {
  const newUser = {
    name: "test",
    lastname: "testLastname",
    username: "testUser",
    email: "testUser@gmail.com",
  }

  test("works", async function() {
    let user = await User.register({...newUser, passowrd: "testPassword"});

    expect(user).toEqual(newUser);
  });

  test("error for duplicate", async function() {
    try {
      await User.register({...newUser, password:"testPassword"})

      await User.register({...newUser, password:"testPassword"})

      fail()
    }catch(err){
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  })
})


describe("authenticate", function() {
  
  test("works", async function() {
    
    let user = await User.authenticate({username: "U1", password: "password1"});

    expect(user).toEqual({name: "U1F", lastname: "U1L", username:"U1", email:"user1@gmail.com"})
  })

  test("NotFound error works", async function() {
    try {
      await User.authenticate({username: "U3", password: "passwordtest"});
    }catch(err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });

  test("wrong password alert", async function() {
    try {
      await User.authenticate({username:"U1", password:"passwordtes"})
    }catch(err) {
      expect(err instanceof NotFoundError).toBeTruthy()
    }
  })
});


describe("update user", function() {
  let newData = {
    name: "newUser",
    lastname: "newF",
    email: "newEmail@gmail.com"
  }

  test("update user works", async function(){
    let result = await User.updateUser("U1", newData);
    expect(result).toEqual({
      username: "U1",
      ...newData
    });
  });
  
})