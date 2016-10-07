'use strict'

const Repository = use('OnFire/Repositories/UserRepository')
const Manager = use('OnFire/Managers/UserManager')

class UserController {

  constructor() {
    this.repository = Repository
    this.manager = Manager
  }

  * index(request, response) {
    let users = yield this.repository.all()
    response.json(users)
  }

  * create(request, response) {
    //
  }

  * store(request, response) {
    //
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
