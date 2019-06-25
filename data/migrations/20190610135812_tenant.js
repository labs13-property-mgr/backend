exports.up = function(knex, Promise) {
  return knex.schema.createTable('tenant', tenant => {
    tenant.increments();

    tenant.string('First_name', 50);
    tenant.string('Last_name', 50);
    tenant.string('phone', 20);
    tenant.string('email', 50).unique();
    tenant.string('Spouse Name', 100);
    tenant.string('additional adult name', 100).defaultTo('');
    tenant.integer('number in household', 100).defaultTo(0);
    tenant.string('child name', 100);
    tenant.string('emergency contact', 100);
    tenant.boolean('active_tenant');
    tenant
      .integer('property_id')
      .references('id')
      .inTable('property')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    tenant
      .string('owner_id')
      .references('uid')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('tenant');
};
