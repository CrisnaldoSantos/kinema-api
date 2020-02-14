'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Movie extends Model {
    watcheds(){
        return this.hasOne('App/Models/Watched')
      }
}

module.exports = Movie
