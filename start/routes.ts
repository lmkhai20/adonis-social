/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'HomeController.index')

Route.get('/login', 'AuthController.loginShow').as('auth.login.show').middleware('guest');
Route.get('/register', 'AuthController.registerShow').as('auth.register.show').middleware('guest');

Route.post('/login', 'AuthController.login').as('auth.login');
Route.post('/register', 'AuthController.register').as('auth.register');
Route.post('logout', 'AuthController.logout').as('auth.logout');

Route.post('/verify-email', 'EmailVerifiesController.index').as('email.verify').middleware('auth');
Route.get('/verify-email/:email', 'EmailVerifiesController.confirm').as('verifyEmail');

Route.get('/accounts/edit', 'ProfilesController.edit').as('profile.edit').middleware('auth');
Route.post('/accounts/edit', 'ProfilesController.update').as('profile.update').middleware('auth');

Route.get('/posts/create', 'PostsController.create').as('posts.create').middleware('auth');
Route.post('/posts/create', 'PostsController.store').as('posts.store').middleware('auth');
Route.get('/posts/show/:id', 'PostsController.show').as('posts.show').middleware('auth');

Route.post('/follow/:userid', 'FollowsController.store').as('follow.store').middleware('auth');
Route.delete('/follow/:userid', 'FollowsController.destroy').as('follow.destroy').middleware('auth');

Route.post('/search', 'ProfilesController.search').as('profile.search');

Route.get('/:username', 'ProfilesController.index').as('auth.profile').middleware('auth');



