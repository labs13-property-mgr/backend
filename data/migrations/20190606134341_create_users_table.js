exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', tbl => {
    tbl.increments();
    tbl.string('uid', 500).unique();
    tbl.string('username', 50);
    tbl.string('First_name', 50);
    tbl.string('Last_name', 50);
    tbl.string('phone', 20);
    tbl
      .string('email', 50)
      .notNullable()
      .unique();
    tbl.string('address', 100);
    tbl.string('role', 50);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
