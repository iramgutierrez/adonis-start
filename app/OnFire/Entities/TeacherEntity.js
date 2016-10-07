'use strict'

const Lucid = use('Lucid')

class TeacherEntity extends Lucid {

  static get table () {
    return 'teachers'
  }

}

module.exports = TeacherEntity
