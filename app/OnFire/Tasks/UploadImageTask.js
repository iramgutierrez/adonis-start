'use strict'

const path = require('path')

class UploadImageTask {

  get paths() {
    return {
      profile_pictures: path.join(__dirname, '../../../profile_pictures'),
    }
  }

  constructor() {

  }

  * profilePicture(file, id) {

    const fileName = `user_${id}.${file.extension()}`

    yield file.move(this.paths.profile_pictures, fileName)

    if (!file.moved()) {
      this.errors = file.errors()
      return false
    }

    return fileName
  }

}

module.exports = UploadImageTask
