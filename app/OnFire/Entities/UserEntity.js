'use strict'

const Lucid = use('Lucid')

class UserEntity extends Lucid {

  static get fillable() {
    return [
      'name',
      'lastname',
      'email',
      'password',
      'gender',
      'birthdate',
      'profile_picture'
    ]
  }

  static get table () {
    return 'users'
  }

  * fill(data) {

    this.fillable( field => {
      console.log(field)
      if(data.hasOwnProperty(field)) {

      }
    })
  }

}

module.exports = UserEntity
