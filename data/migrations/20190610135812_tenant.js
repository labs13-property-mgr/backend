exports.up = function(knex, Promise) {
  return knex.schema.createTable('tenant', tenant => {
    tenant.increments(); // Tenant PRimary Key

    tenant.string('First_name', 50);
    tenant.string('Last_name', 50);
    tenant.string('phone', 20).notNullable();
    tenant
      .string('email', 50)
      .notNullable()
      .unique();
    tenant.string('Spouse Name', 100);
    tenant.string('additional adult name', 100);
    tenant.integer('number in household', 100);
    tenant.string('child name', 100);
    tenant.integer('emergency contact', 100);
    tenant.boolean('active_tenant');//this is no longer needed
    tenant
      .string('property_id')
      .notNullable()
      .references('id')
      .inTable('property')
      .onDelete('CASCADE')
      .onUpdate('CASCADE'); //links to property they are/have rented
    tenant
      .string('owner_id')
      .notNullable()
      .references('uid')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE'); //links to landlord
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('tenant');
};

// Tenant Name, Spouse Name, Additional Adult Name, Number in Household, Child (first name),
// Pets In Residence, type of pet, name of pet, Contact info for household, Emergency Contact Info

// seperate users - owners and tenants seperate
//if ethan knows how to do the roles correctly
