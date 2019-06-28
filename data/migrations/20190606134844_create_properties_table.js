exports.up = function(knex, Promise) {
  return knex.schema.createTable('property', tbl => {
    tbl.increments(); // Property Primary Key

    tbl.string('property_name', 128);
    tbl.string('address', 100);
    tbl.string('image_url', 1000);
    tbl // Foreign Key that links to user table Owner of property

      .string('owner_id')
      .notNullable()
      .references('uid')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('property');
};
