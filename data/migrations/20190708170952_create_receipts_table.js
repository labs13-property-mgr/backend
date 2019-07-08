exports.up = function(knex, Promise) {
    return knex.schema.createTable('receipt', tbl => {
      tbl.increments();
      tbl.string('receipt_name', 128);
      tbl.string('receipt_image_url', 500)
      tbl
  
        .integer('user_id')
        .unsigned()
        .references('uid')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE'); // links to user table/owner of receipt
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('property_image');
  };