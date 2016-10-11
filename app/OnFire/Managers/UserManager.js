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
    this.data = {}
  }

  * save(data) {
    this.data = data
    this.prepareData()
    let isValid = yield this.validator.isValid(data)

    if(isValid) {
      this.entity = new this.entity()
      console.log(this.entity)
      return yield this.entity.fill(data)
      return yield this.entity.all()
    } else {
      return yield this.validator.errors
    }

  }

  prepareData() {
    let data = this.data

    /*TO DO*/

    this.data = data
  }

}

module.exports = UserManager
