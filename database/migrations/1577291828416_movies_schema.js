'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MoviesSchema extends Schema {
  up () {
    this.create('movies', (table) => {
      table.increments()
      table.string('title',240).notNullable()
      table.date('debut_date').defaultTo('1000-01-01')
      table.string('sinopse',500)
      table.boolean('watched_flag').defaultTo(false).notNullable()
      table
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('id').inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      table
      .integer('genre_id')
      .unsigned()
      .notNullable()
      .references('id').inTable('genres')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('movies')
  }
}

module.exports = MoviesSchema
