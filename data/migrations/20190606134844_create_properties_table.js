exports.up = function(knex, Promise) {
  return knex.schema.createTable("property", tbl => {
    tbl.increments();
    tbl.string("property_name").notNullable();
    tbl.string("address").notNullable();
    tbl.string("unit");
    tbl.string("city").notNullable();
    tbl.string("state").notNullable();
    tbl.string("zip").notNullable();
    tbl.string("rent");
    tbl.string("image_url");
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
