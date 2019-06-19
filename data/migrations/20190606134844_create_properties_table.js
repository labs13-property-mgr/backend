exports.up = function(knex, Promise) {
	return knex.schema.createTable('property', (tbl) => {
		tbl.increments(); // Property Primary Key

		tbl.string('property_name', 128);
		tbl.string('address', 100);
		tbl // Foreign Key that links to user table Owner of property
			.integer('owner_id')
			.unsigned()
			.references('id')
			.inTable('users')
			.onDelete('CASCADE')
			.onUpdate('CASCADE');
		tbl // Foreign Key that links to tenant table
			.integer('tenant_id')
			.unsigned()
			.references('id')
			.inTable('tenant')
			.onDelete('CASCADE')
			.onUpdate('CASCADE');
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('property');
};
