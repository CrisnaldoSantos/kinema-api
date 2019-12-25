'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Movie = use('App/Models/Movie');
const Database = use('Database');
/**
 * Resourceful controller for interacting with movies
 */
class MovieController {
  /**
   * Show a list of all movies.
   * GET movies
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index (auth) {
    const User = use('App/Models/User');

    const user = await User.find(auth.user.id);
    const movies = await user
    .movies().where('watched_flag',false).fetch();

    return movies;
  }

  /**
   * Create/save a new movie.
   * POST movies
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request,auth }) {
    const data = request.only(['title','debut_date','sinopse','genre_id']);
    const movie = await Movie.create({user_id:auth.user.id, ...data});

    return movie;
  }

  /**
   * Display a single movie.
   * GET movies/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params }) {
    const movie = await Movie.findOrFail(params.id);
    return movie;
  }

  /**
   * Update movie details.
   * PUT or PATCH movies/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request }) {
    const data = request.only(['title','debut_date','sinopse','genre_id','watched_flag']);
    const movie = await Movie.find(params.id);

    movie.merge(data);
    await movie.save();

    return movie;
  }

  /**
   * Delete a movie with id.
   * DELETE movies/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params}) {
    const movie = await Movie.findOrFail(params.id);
    await movie.delete();
  }

  async showAll ({ params}) {
    const movies = await Database.table('movies').query('user_id',params.user_id)
    return movies;
  }

  async showOnlyUser ({ auth}) {
    
    const User = use('App/Models/User')
    const user = await User.find(auth.user.id)
    const movies = await user
    .movies().where('watched_flag',false).fetch();

    return movies;
  }
}

module.exports = MovieController
