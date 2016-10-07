'use strict'

const Entity = use('OnFire/Entities/UserEntity')

class UserRepository {

  static get inject() {
    return [
      Entity
    ]
  }

  constructor(Entity) {
    this.entity = Entity
  }

  * all() {
    return yield this.entity.all()
  }

}

module.exports = UserRepository
