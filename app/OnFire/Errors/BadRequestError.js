'use strict'

const BaseError = use('OnFire/Errors/BaseError')

class BadRequestError extends BaseError {

  constructor(message, errors) {
    super(message, errors)
    this.errors = errors
  }

  all() {
    return this.errors
  }
}

module.exports = BadRequestError
