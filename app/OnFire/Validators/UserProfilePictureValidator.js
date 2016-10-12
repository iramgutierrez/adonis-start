'use strict'

const Validator = use('Validator')
const Entity = use('OnFire/Entities/UserEntity')

class UserProfilePictureValidator {

  constructor() {
    this.errors = []
  }

  get rules() {
    return [
      function extension(file)  {
        return ['png', 'jpg', 'jpeg'].indexOf(file.extension()) !== -1
      },
      function size(file) {
        return file.clientSize() <= 2000000
      },
    ]
  }

  get messages() {
    return {
      extension: "Invalid extension",
      size: "Invalid size"
    }
  }

  * isValid(file) {

    let isValid = true

    this.rules.forEach( passes => {
      if(!passes(file)) {
        isValid = false
        this.errors.push(this.messages[passes.name])
      }
    })

    return isValid;

  }

}

module.exports = UserProfilePictureValidator
