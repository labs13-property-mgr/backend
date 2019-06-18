exports.up = function(knex, Promise) {
  return knex.schema.createTable("tenant", tenant => {
    tenant.increments();
    tenant
      .integer("property_id")
      .unsigned()
      .references("id")
      .inTable("property")
      .onUpdate("CASCADE");
    tenant
      .string("First_name", 50)
      .references("First_name")
      .inTable("users")
      .notNullable()
      .onUpdate("CASCADE");
    tenant
      .string("Last_name", 50)
      .references("Last_name")
      .inTable("users")
      .notNullable()
      .onUpdate("CASCADE");
    tenant
      .string("phone", 20)
      .references("phone")
      .inTable("users")
      .notNullable()
      .onUpdate("CASCADE");
    tenant
      .string("email", 50)
      .notNullable()
      .unique()
      .references("email")
      .inTable("users")
      .onUpdate("CASCADE");

    tenant.string("Spouse Name", 100);

    tenant.string("additional adult name", 100);

    tenant.integer("number in household", 100);

    tenant.string("child name", 100);

    tenant.integer("emergency contact", 100);
    tenant.boolean("active_tenant");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("tenant");
};

// Tenant Name, Spouse Name, Additional Adult Name, Number in Household, Child (first name),
// Pets In Residence, type of pet, name of pet, Contact info for household, Emergency Contact Info
