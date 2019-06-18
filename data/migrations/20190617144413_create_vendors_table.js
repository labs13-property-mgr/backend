exports.up = function(knex, Promise) {
  return knex.schema.createTable('vendor', vendor => {
    vendor.increments();
    vendor.string('company_name', 100);
    vendor.string('address', 100);
    vendor.string('first_name', 50);
    vendor.string('last_name', 50);
    vendor.string('phone', 20);
    vendor.string('email', 50);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('vendor');
};
