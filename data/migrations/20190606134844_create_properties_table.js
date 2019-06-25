exports.up = function(knex, Promise) {
  return knex.schema.createTable('property', tbl => {
    tbl.increments();
    tbl.string('property_name', 128);
    tbl.string('address', 100);
    tbl
      .string('owner_id')
      .references('uid')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('property');
};
