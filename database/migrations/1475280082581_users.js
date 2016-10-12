'use strict'

const Schema = use('Schema')

class UsersSchema extends Schema {

  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('name').nullable(false)
      table.string('lastname').nullable(false)
      table.string('email').unique().nullable(false)
      table.string('password').nullable(false)
      table.string('gender').nullable(false)
      table.date('birthdate').nullable(false)
      table.string('profile_picture')
      table.boolean('welcome_email').nullable(false).default(0)
      table.timestamps()
      table.softDeletes()
    })
  }

  down () {
    this.drop('users')
  }

}

module.exports = UsersSchema
