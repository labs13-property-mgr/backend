
exports.up = function(knex, Promise) {
  return knex.schema.table("service_orders", function(tbl) {
      tbl.string("owner_phone", 20)
      .unsigned()
      .references("phone")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE")
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("service_orders")
};
