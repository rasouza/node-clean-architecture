const errors = require('restify-errors')

class NotFound extends errors.NotFoundError {}
class AlreadyExists extends errors.ForbiddenError {}

module.exports = () => ({ NotFound, AlreadyExists })
