'use strict'

const Ioc = require('adonis-fold').Ioc
Ioc.bind('Adonis/Src/MyName', function () {
  return 'Iram'
})
Ioc.bind('Adonis/Src/MyLastName', function () {
  return 'Gutierrez'
})
Ioc.bind('Adonis/Src/MyFullName', function () {
  let name = use('Adonis/Src/MyName')
  let lastname = use('Adonis/Src/MyLastName')
  return `${name} ${lastname}`
})

/*
|--------------------------------------------------------------------------
| Extend Providers
|--------------------------------------------------------------------------
|
| Some providers give options to be extended like SessionProvider. In this
| file you can easily track which providers are extended.
|
| @note - Here you do not have access to any providers, which means this file
| is called before loading service providers. But have access to the Ioc
| container and you can use it extend providers, which are about to get
| registered.
|
| @example
| Ioc.extend('Adonis/Src/Session', 'redis', function (app) {
|   // your redis driver implementation
| })
|
*/
