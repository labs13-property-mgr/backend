exports.up = function(knex, Promise) {
  return knex.schema.createTable('property_image', tbl => {
    tbl.increments();
    tbl.string('property_image_name', 400);
    tbl

      .integer('property_id')
      .unsigned()
      .references('id')
      .inTable('property')
      .onDelete('CASCADE')
      .onUpdate('CASCADE'); // links to property table of property_image
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('property_image');
};
