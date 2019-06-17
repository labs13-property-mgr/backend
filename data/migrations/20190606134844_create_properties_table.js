exports.up = function(knex, Promise) {
  return knex.schema.createTable("property", tbl => {
    tbl.increments();
    tbl.string("property_name", 128);
    tbl.string("address", 100);
    tbl
      .integer("owner_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE"); // links to user table Owner of property
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("property");
};
