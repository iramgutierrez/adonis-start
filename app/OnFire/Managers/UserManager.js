'use strict'

const Entity = use('OnFire/Entities/UserEntity')
const Validator = use('OnFire/Validators/UserValidator')
const ProfilePictureValidator = use('OnFire/Validators/UserProfilePictureValidator')
const UploadImage = use('OnFire/Tasks/UploadImageTask')
const SendEmail = use('OnFire/Tasks/SendEmailTask')
const InternalServerError = use('OnFire/Errors/InternalServerError')
const BadRequestError = use('OnFire/Errors/BadRequestError')

class UserManager {

  static get inject() {
    return [
      Entity,
      Validator,
      UploadImage,
      ProfilePictureValidator,
      SendEmail
    ]
  }

  constructor(Entity, Validator, UploadImage, ProfilePictureValidator, SendEmail) {
    this.entity = Entity
    this.validator = Validator
    this.upload_image = UploadImage
    this.profile_picture_validator = ProfilePictureValidator
    this.send_email = SendEmail
    this.data = {}
  }

  * save(data) {
    this.errors = {}
    this.data = data
    this.prepareData()
    let isValid = yield this.validator.isValid(this.data)
    let fullValidateProfilePicture =  this.data.profile_picture ?
                                      yield this.profile_picture_validator.isValid(this.data.profile_picture) :
                                      true

    if(isValid &&  fullValidateProfilePicture) {
      let entity = new this.entity
      yield entity.fill(this.data)

      try {
        yield entity.save()
      } catch(e) {
        this.errors = new InternalServerError('Internal server error', e.message)
        return false
      }

      if(!this.data.profile_picture) {
        return entity
      }

      yield this._saveProfilePicture(entity)

      return entity

    } else {
      let errors = this.validator.errors

      if(!fullValidateProfilePicture) {
        errors.profile_picture = this.profile_picture_validator.errors.shift()
      }
      this.errors = new BadRequestError('Bad Request', errors)
      return false
    }

  }

  * _saveProfilePicture(entity) {

    let uploadImage = yield this.upload_image.profilePicture(this.data.profile_picture, entity.id)

    if(uploadImage) {
      entity.profile_picture = uploadImage
      yield entity.save()
    } else {
      console.log(this.upload_image.errors)
    }
  }

  * sendEmail(entity) {

    try{
      yield this.send_email.welcome(entity)
    }catch(e) {
      console.log(e.message)
      return false
    }

    entity.welcome_email = 1
    yield entity.save()

    return true
  }

  prepareData() {
    let data = this.data

    /*TO DO*/

    this.data = data
  }

}

module.exports = UserManager
