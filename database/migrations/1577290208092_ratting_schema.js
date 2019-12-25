'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RattingSchema extends Schema {
  up () {
    this.create('rattings', (table) => {
      table.increments()
      table.string('description',240).notNullable()
    })
  }

  down () {
    this.drop('rattings')
  }
}

module.exports = RattingSchema
