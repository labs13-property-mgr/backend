
exports.up = function(knex, Promise) {
  return knex.schema.table("service_orders", function(tbl) {
      tbl.renameColumn("request_name", "body")
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("service_orders")
};
