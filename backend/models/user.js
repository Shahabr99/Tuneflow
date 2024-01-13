const bcrypt = require("bcrypt");
const db = require("../db");
const { BCRYPT_WORK_FACTOR } = require("../config");
const { NotFoundError, BadRequestError, UnauthorizedError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql")

// related functions for a new user
class User {

  // Create a new user in database
  static async register({name, lastname, username, password, email}) {
    const checkDuplicate = await db.query(`SELECT username, password FROM users WHERE username = $1`, [username]);
    if(checkDuplicate.rows[0]) {
      throw new BadRequestError(`Duplicate username: ${username}`)
    }

    const hashed_pwd = await bcrypt.hash(password, BCRYPT_WORK_FACTOR)
    const result = await db.query(
      `INSERT INTO users 
      (username,
      password,
      name,
      lastname,
      email,
      )
      VALUES ($1, $2, $3, $4, $5, $6) 
      RETURNING username, name, lastname, email`, 
      [username, hashed_pwd, name, lastname, email]
    )

    console.log(result)
    const user = result.rows[0];
    return user;
  }

  // find the user in database and check if the password is correct
  static async authenticate(username, password) {
    const result = await db.query(`SELECT username, password, name, lastname FROM users WHERE username = $1`, [username]);
    const user = result.rows[0];
    console.log(`DATABASE found ${user}`)
    if(!user) {
      throw new NotFoundError(`username ${data.username} does NOT exist!`)
    }

    const valid_pwd = bcrypt.compare(password, user.password);
    if(valid_pwd) {
      // making sure pwd is not exposed
      delete user.password;
      return user;
    }else{
      throw new UnauthorizedError(`Access denied! Wrong password❗`)
    }
  }

  // Changes user info in database
  static async updateUser(username, data) {
    const {setCols, values} = sqlForPartialUpdate(
      data
    );

    const idx = "$" + (values.length + 1);

    const querySql = `UPDATE users SET ${setCols} WHERE username = ${idx} RETURNING username, name, lastname, email`;

    const result = await db.query(querySql, [...values, username]);

    const user = result.rows[0];

    if(!user) throw new NotFoundError(`No user: ${username}`);
    delete user.password;
    return user;
  }

  // deletes a user from db
  static async remove(username) {
    let result = db.query(`DELETE FROM users WHERE username = $1 RETURNING username`, [username]);

    const user = result.user[0];
    if(!user) throw new NotFoundError(`No user: ${username}`)
  }

  // Gets a user's information from db
  static async get(username) {
    const result = await db.query(`SELECT username, name, lastname, email FROM users WHERE username = $1`, [username]);
    const user = result.rows[0];
    if(!user) throw new NotFoundError("No user found!");
    console.log(`${user}`)
    return user
  }

  // Fetches the playlists of a user
  static async getUserPlaylists(username) {
    const result = await db.query(`SELECT name FROM playlists WHERE username_playlist == $1`, [username]);
    const playlists = result.rows;
    if(!playlists) throw new NotFoundError("No playlists found");
    return playlists;
  }

  
}

module.exports = User;