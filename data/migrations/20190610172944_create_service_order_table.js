exports.up = function(knex, Promise) {
    return knex.schema.createTable("service_orders", tbl => {
      tbl.increments();
      tbl.integer("tenant_id");
      tbl.integer("owner_id");
      tbl.string("date_created", 100);
      tbl.string("contractor", 100);
      tbl.string("apointment", 100);
      tbl.string("followup", 100);
      tbl.string("property_id", 100);
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("service_orders");
  };