'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Watched extends Model {
    ratting(){
        return this.hasOne('App/Models/Ratting')
    }
}

module.exports = Watched
