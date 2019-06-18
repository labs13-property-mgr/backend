exports.up = function(knex, Promise) {
  return knex.schema.createTable('service_orders', tbl => {
    tbl.increments()
    tbl.string('date_created', 100)
    tbl.string('request_name', 150).notNullable()
    tbl.string('status', 100) // for status bar
    tbl.string('notes', 1500)
    tbl.string('request_description', 1500).notNullable()
    tbl.string('contractor', 100) //link to contractor table?
    tbl.string('appointment', 100)
    tbl.string('followup', 100)
    tbl.boolean('resolved_tenant')
    tbl.boolean('resolved_owner')
    tbl
      .integer('property_id')
      .unsigned()
      .references('id')
      .inTable('property')
      .onDelete('CASCADE')
      .onUpdate('CASCADE') //link to property *** will be not nullable
    tbl.integer('tenant_id', 10) //link to tenant
    tbl.boolean('received') //flags when owner/manager opens service card
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('service_orders')
}
