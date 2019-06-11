exports.up = function(knex, Promise) {
  return knex.schema.createTable('service_orders', tbl => {
    tbl.increments()
    tbl.string('date_created', 100)
    tbl.integer('property_id', 10).notNullable() //link to property
    tbl.integer('tenant_id', 10).notNullable() //link to tenant

    tbl.string('notes', 1000)
    tbl.string('contractor', 100) //link to contractor table?
    tbl.string('apointment', 100)
    tbl.string('followup', 100)
    tbl.boolean('resolved_tenant')
    tbl.boolean('resolved_owner')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('service_orders')
}
