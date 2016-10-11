'use strict'

const Repository = use('OnFire/Repositories/UserRepository')
const Manager = use('OnFire/Managers/UserManager')

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
                    'profile_picture': request.file('profile_picture').toJSON().size ?
                                       request.file('profile_picture') :
                                       null
                  }
                )
    return response.json(yield this.manager.save(data))
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
