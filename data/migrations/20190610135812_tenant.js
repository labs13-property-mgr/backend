exports.up = function(knex, Promise) {
  return knex.schema.createTable("tenant", tenant => {
    tenant.increments();
    tenant
      .integer("property_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("property")
      .onUpdate("CASCADE");

    tenant
      .integer("user_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE") // update the foreign key as well
      .onDelete("RESTRICT");

    // will join with users table -  a lot of the same information
    // tenant
    //   .string("First_name", 50)
    //   .references("First_name")
    //   .inTable("users")
    //   .notNullable()
    //   .onUpdate("CASCADE");
    // tenant
    //   .string("Last_name", 50)
    //   .references("Last_name")
    //   .inTable("users")
    //   .notNullable()
    //   .onUpdate("CASCADE");
    // tenant
    //   .string("phone", 20)
    //   .references("phone")
    //   .inTable("users")
    //   .notNullable()
    //   .onUpdate("CASCADE");
    // tenant
    //   .string("email", 50)
    //   .notNullable()
    //   .unique()
    //   .references("email")
    //   .inTable("users")
    //   .onUpdate("CASCADE");

    // no spaces - !!!!! MAKE CHANGE
    tenant.string("spouse_name", 100);

    tenant.string("additional_adult_name", 100);

    tenant.integer("number_in_household", 100);

    tenant.string("child_name", 100);

    tenant.integer("emergency_contact", 100);
    tenant.boolean("active_tenant");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("tenant");
};

// Tenant Name, Spouse Name, Additional Adult Name, Number in Household, Child (first name),
// Pets In Residence, type of pet, name of pet, Contact info for household, Emergency Contact Info

// seperate users - owners and tenants seperate
//if ethan knows how to do the roles correctly
