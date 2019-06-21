exports.up = function(knex, Promise) {
	return knex.schema.createTable('vendor', (vendor) => {
		vendor.increments(); // Vendor Primary Key

		vendor.string('company_name', 100);
		vendor.string('address', 100);
		vendor.string('first_name', 50);
		vendor.string('last_name', 50);
		vendor.string('phone', 20);
		vendor.string('email', 50);
		vendor // Foreign Key that links vendor to the owner address book
			.integer('owner_id')
			.notNullable()
			.references('id')
			.inTable('user')
			.onUpdate('CASCADE')
			.onDelete('CASCADE');
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('vendor');
};
