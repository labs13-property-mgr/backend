exports.up = function(knex, Promise) {
  return knex.schema.createTable("tenant", tenant => {
    tenant.incerements();

    tenant.string("name", 100).notNullable();

    tenant.string("Spouse Name", 100).notNullable();

    tenant.string("additional adult name", 100);

    tenant.integer("number in household", 100).notNullable();

    tenant.string("child name", 100);

    tenant.integer("contact info", 100).notNullable();

    tenant.integer("emergency contact", 100).notNullable();
  });
};

exports.down = function(knex, Promise) {};

// Tenant Name, Spouse Name, Additional Adult Name, Number in Household, Child (first name),
// Pets In Residence, type of pet, name of pet, Contact info for household, Emergency Contact Info
