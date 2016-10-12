'use strict'

class BaseError extends Error {
  constructor(message, log) {
    super()
    this.message = message
    this.stack = (new Error()).stack
    this.name = this.constructor.name
    console.log(log)
  }
}

module.exports = BaseError
