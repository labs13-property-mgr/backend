exports.up = function(knex, Promise) {
  return knex.schema.createTable('property_tenant', propertyTenant => {
    propertyTenant.increments(); // unique ID

    propertyTenant
      .string('propertyId')
      .unsigned()
      .references('id')
      .inTable('property')
      .notNullable()
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    propertyTenant
      .string('tenantId')
      .unsigned()
      .references('id')
      .inTable('tenant')
      .notNullable()
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('property_tenant');
};
