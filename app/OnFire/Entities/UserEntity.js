'use strict'

const Lucid = use('Lucid')

class UserEntity extends Lucid {

  get fillable() {
    return [
      'name',
      'lastname',
      'email',
      'password',
      'gender',
      'birthdate',
      'welcome_email'
    ]
  }

  get fillableFiles() {
    return [
      'profile_picture',
    ]
  }

  static get hidden() {
    return [
      'password', 'deleted_at'
    ]
  }

  static get table () {
    return 'users'
  }

  * fill(data) {

    this.fillable.forEach( field => {

      if(data.hasOwnProperty(field)) {
        this[field] = data[field]
      }
    })
  }

}

module.exports = UserEntity
