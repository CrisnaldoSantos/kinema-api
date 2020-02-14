'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Watched =  use('App/Models/Watched');
const Ratting = use('App/Models/Ratting');
class WatchedController {
    /**
   * Display a single ratting.
   * GET rattings/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
    async show({params}){
        const watched = await Watched.findOrFail(params.id);
        const ratting = await Ratting.findOrFail(watched.rattings_id);
        
        return {watched,ratting};
    }

    /**
   * Create/save a new ratting.
   * POST rattings
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
    async store({request}){
        const data = request.only(['id','observations','costs','rattings_id']);
        const watched = await Watched.create(data);
        return watched;
    }

  /**
   * Update ratting details.
   * PUT or PATCH rattings/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
    async update({params,request}){
        const data = request.only(['observations','costs','rattings_id']);
        const watched = await Watched.find(params.id);

        watched.merge(data);
        await watched.save();

        return watched;
    }

    /**
   * Delete a ratting with id.
   * DELETE rattings/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
    async destroy({params}){
        const watched = await Watched.find(params.id);
        await watched.delete();
    }
}

module.exports = WatchedController
