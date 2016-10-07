'use strict'

const Lucid = use('Lucid')

class UserEntity extends Lucid {

  static get table () {
    return 'users'
  }

}

module.exports = UserEntity
