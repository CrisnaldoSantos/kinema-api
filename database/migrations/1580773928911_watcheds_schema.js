'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class WatchedsSchema extends Schema {
  up () {
    this.create('watcheds', (table) => {
      table.integer('id')
      .unsigned()
      .notNullable()
      .references('id').inTable('movies')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      .unique()
      .primary()
      table.string('observations',500)
      table.decimal('costs')
      table.integer('rattings_id')
      .unsigned()
      .notNullable()
      .references('id').inTable('rattings')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      table.timestamps('date',{useTz:false})
    })
  }

  down () {
    this.drop('watcheds')
  }
}

module.exports = WatchedsSchema
