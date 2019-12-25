'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Welcome to Kinema API!' }
})

Route.post('/register','AuthController.register')
Route.get('/authenticated','AuthController.authenticated')

Route.group(()=>{
  Route.resource('genres','GenreController').apiOnly().except(['destroy','update','store'])
  Route.resource('rattings','RattingController').apiOnly().except(['destroy','update','store'])
  Route.resource('movies','MovieController').apiOnly().except(['index'])
  Route.get('/movies','MovieController.showOnlyUser')
}).middleware('auth')