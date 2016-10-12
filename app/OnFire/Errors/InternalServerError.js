'use strict'

const BaseError = use('OnFire/Errors/BaseError')

class InternalServerError extends BaseError {

  constructor(message, error) {
    super(message, error)
  }
  first() {
    return this.message
  }
}

module.exports = InternalServerError
