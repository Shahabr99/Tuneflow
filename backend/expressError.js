class ExpressError extends Error {
  constructor(message, status) {
    super();
    this.message = message;
    this.status = status;
  }
}

// Duplicate data error
class DuplicateFoundError extends ExpressError{
  constructor(message="Duplicate Found!") {
    super(message, 409)
  }
}


// 404 error NOT FOUND
class NotFoundError extends ExpressError {
  constructor(message = "NOT FOUND!") {
    super(message, 404)
  }
}


// 401 UNAUTHORIZED error.
class UnauthorizedError extends ExpressError {
  constructor(message= "UNAUTHORIZED ACCESS!") {
    super(message, 401)
  }
}


// 400 BAD REQUEST error.
class BadRequestError extends ExpressError {
  constructor(message="BADREQUEST ERROR!") {
    super(message, 400)
  }
}


// 403 BAD REQUEST error
class ForbiddenError extends ExpressError {
  constructor(message="BAD REQUEST!"){
    super(message, 403)
  }
}


module.exports = {ExpressError, NotFoundError, UnauthorizedError, BadRequestError, ForbiddenError, DuplicateFoundError}