exports.up = function(knex, Promise) {
  return knex.schema.createTable('property', tbl => {
    tbl.increments(); // Property Primary Key

    tbl.string('property_name', 128);
    tbl.string('address', 100);
    tbl 
      .string('owner_id')
      .notNullable()
      .references('uid')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');// Foreign Key that links to user table Owner of property
      // Active tenant needs to link to tenant table as forign key so that the owner can declare who the tenant is.
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('property');
};
