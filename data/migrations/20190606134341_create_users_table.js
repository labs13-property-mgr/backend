exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', tbl => {
    tbl.increments();

    tbl
      .string('username', 128)
      .notNullable()
      .unique();
    tbl.string('password', 255).notNullable();
    tbl.string('First_name', 50);
    tbl.string('Last_name', 50);
    tbl.string('phone', 20);
    tbl.string('email', 50);
    tbl.string('address', 100);
    tbl.string('role', 50);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
