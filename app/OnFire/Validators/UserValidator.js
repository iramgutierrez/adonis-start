'use strict'

const Entity = use('OnFire/Entities/UserEntity')

class UserValidator {

  static get inject() {
    return [
      Entity
    ]
  }

  constructor(Entity) {
    this.entity = Entity
  }

  * isValid() {
    return yield true
  }

}

module.exports = UserValidator
