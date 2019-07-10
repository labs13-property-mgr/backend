exports.up = function(knex, Promise) {
  return knex.schema.createTable("property", tbl => {
    tbl.increments();
    tbl.string("property_name").notNullable();
    tbl.string("address").notNullable();
    tbl

<<<<<<< HEAD
=======

>>>>>>> 8b3a5ad06ca522af61435f454eadec6bf3d9ed5e
      .string("owner_id")
      .references("uid")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
<<<<<<< HEAD
=======

>>>>>>> 8b3a5ad06ca522af61435f454eadec6bf3d9ed5e
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("property");
};
