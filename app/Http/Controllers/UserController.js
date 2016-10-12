'use strict'

const Repository = use('OnFire/Repositories/UserRepository')
const Manager = use('OnFire/Managers/UserManager')
const Entity = use('OnFire/Entities/UserEntity')
const InternalServerError = use('OnFire/Errors/InternalServerError')
const BadRequestError = use('OnFire/Errors/BadRequestError')

class UserController {

  constructor(Repository, Manager) {
    this.repository = Repository
    this.manager = Manager
  }

  static get inject() {
    return [
      Repository,
      Manager
    ]
  }

  * index(request, response) {
    let users = yield this.repository.all()
    response.json(users)
  }

  * create(request, response) {
    //
  }

  * store(request, response) {

    let data =  Object.assign(
                  request.all(),
                  {
                    'profile_picture': request.file('profile_picture').clientSize() ?
                                       request.file('profile_picture') :
                                       null
                  }
                )
    let saved = yield this.manager.save(data)

    if(this.manager.errors instanceof InternalServerError) {
      return response.internalServerError({ error: this.manager.errors.first() })
    } else if(this.manager.errors instanceof BadRequestError) {
      return response.badRequest(this.manager.errors.all())
    }
    yield this.manager.sendEmail(saved)

    return response.created(saved)
  }

  * show(request, response) {
    response.json(request.id)
    let users = yield User.all()
    response.json(users,200)
  }

  * edit(request, response) {
    //
  }

  * update(request, response) {
    //
  }

  * destroy(request, response) {
    //
  }

}


module.exports = UserController
