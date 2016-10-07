'use strict'

const Entity = use('OnFire/Entities/UserEntity')
const Validator = use('OnFire/Validators/UserValidator')

class UserManager {

  static get inject() {
    return [
      Entity,
      Validator
    ]
  }

  constructor(Entity, Validator) {
    this.entity = Entity
    this.validator = Validator
  }

  * save() {
    return yield this.entity.all()
  }

}

module.exports = UserManager
