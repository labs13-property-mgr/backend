exports.up = function(knex, Promise) {
  return knex.schema.createTable("property", tbl => {
    tbl.increments();
    tbl.string("property_name").notNullable();
    tbl.string("address").notNullable();
    tbl


      .string("owner_id")
      .references("uid")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("property");
};
