exports.up = function(knex, Promise) {
  return knex.schema.createTable('service_orders', tbl => {
    tbl.increments(); //Service Orders Primary Key

    tbl.string('date_created', 100);
    tbl.string('request_name', 150).notNullable();
    tbl.string('request_description', 1500).notNullable();
    tbl.string('status', 100); // for status bar
    tbl.string('notes', 1500);
    tbl.string('appointment', 100);
    tbl.string('followup', 100);
    tbl.boolean('resolved_tenant');
    tbl.boolean('resolved_owner');
    tbl // Foreign Key linking to property table *** will be not nullable
      .integer('property_id')
      .unsigned()
      .references('id')
      .inTable('property')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    tbl // Foreign Key linking tenant table
      .integer('tenant_id')
      .unsigned()
      .references('id')
      .inTable('tenant')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    tbl // Foreign Key linking user table
      .integer('owner_id')
      .unsigned()
      .references('uid')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    tbl.boolean('received'); //flags when owner/manager opens service card
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('service_orders');
};
