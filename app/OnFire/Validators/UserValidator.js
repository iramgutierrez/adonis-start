'use strict'

const Validator = use('Validator')
const Entity = use('OnFire/Entities/UserEntity')

class UserValidator {

  static get inject() {
    return [
      Entity
    ]
  }

  get rules() {
    return {
      name: 'required',
      lastname: 'required',
      email: 'required|email|unique:users',
      password: 'required|confirmed',
      gender: 'required',
      birthdate: 'required|date'
    }
  }

  constructor(Entity) {
    this.entity = Entity
  }

  * isValid(data) {

    let isValid = yield Validator.validateAll(data, this.rules)

    if (isValid.fails()){
      this.parseErrors(isValid.messages());
      return false;
    }

    return true;

  }

  parseErrors(messages) {
    let errors = {}

    messages.forEach(error => {
      errors[error.field] = error.message
    })

    this.errors = errors
  }

}

module.exports = UserValidator
