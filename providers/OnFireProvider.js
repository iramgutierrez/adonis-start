'use strict'

const ServiceProvider = require('adonis-fold').ServiceProvider
const path = require('path')
var readDirFiles = require('readdir');

class OnFireProvider extends ServiceProvider {

  * register () {

    const OnFireFiles = readDirFiles
                                .readSync(
                                  path.join(__dirname, '../app/OnFire'),
                                  [
                                    'Entities/**.js',
                                    'Validators/**.js',
                                    'Repositories/**.js',
                                    'Managers/**.js'
                                  ]
                                )

    OnFireFiles.forEach( f => {
      let layers = f.split('/')
      let layer = layers[0]
      let name = layers[1]

      let nameSpace =  `OnFire/${layer}/${name}`.replace('.js', '')
      let pathModule = path.join(__dirname, `../app/OnFire/${layer}/${name}`).replace('.js', '')

      this.app.bind(nameSpace, function () {

        const Module = use(pathModule)

        if(layer == 'Entities') {
          return Module
        }

        let dependencies = Module.inject
        return Reflect.construct(Module, dependencies)

      })

    })
  }
}

module.exports = OnFireProvider
