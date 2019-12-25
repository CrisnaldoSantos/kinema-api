'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Ratting = use('App/Models/Ratting');
/**
 * Resourceful controller for interacting with rattings
 */
class RattingController {
  /**
   * Show a list of all rattings.
   * GET rattings
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index () {
    const rattings = await Ratting.all();
    return rattings;
  }

  /**
   * Create/save a new ratting.
   * POST rattings
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request}) {
    const data = request.only(['description']);
    const ratting = await Ratting.create(data);

    return ratting;
  }

  /**
   * Display a single ratting.
   * GET rattings/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({params}) {
    const ratting = await Ratting.findOrFail(params.id);
    return ratting;
  }


  /**
   * Update ratting details.
   * PUT or PATCH rattings/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request }) {
    const data = request.only(['description']);
    const ratting = await Ratting.find(params.id);

    ratting.merge(data);
    await ratting.save();

    return ratting;
  }

  /**
   * Delete a ratting with id.
   * DELETE rattings/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const genre = await Genre.find(params.id);
    await genre.delete();
  }
}

module.exports = RattingController
