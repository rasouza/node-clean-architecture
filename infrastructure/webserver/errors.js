function NotFoundError (description) {
  Error.call(this)
  Error.captureStackTrace(this)
  this.name = 'NOT_FOUND'
  this.statusCode = 404
  this.description = description
  this.isOperational = true
}
NotFoundError.prototype = Object.create(Error.prototype)
NotFoundError.prototype.constructor = NotFoundError

function AlreadyExistsError (description) {
  Error.call(this)
  Error.captureStackTrace(this)
  this.name = 'ALREADY_EXISTS'
  this.statusCode = 409
  this.description = description
  this.isOperational = true
}
AlreadyExistsError.prototype = Object.create(Error.prototype)
AlreadyExistsError.prototype.constructor = AlreadyExistsError

module.exports = {
  NotFoundError,
  AlreadyExistsError
}
