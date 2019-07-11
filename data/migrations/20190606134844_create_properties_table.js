exports.up = function(knex, Promise) {
  return knex.schema.createTable("property", tbl => {
    tbl.increments();
    tbl.string("property_name", 150).notNullable();
    tbl.string("address", 150).notNullable();
    tbl.string("unit", 150);
    tbl.string("city", 150).notNullable();
    tbl.string("state", 150).notNullable();
    tbl.string("zip", 150).notNullable();
    tbl.string("rent", 150);
    tbl.string("image_url", 250);
    tbl

      .string("owner_id", 150)
      .references("uid")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("property");
};
