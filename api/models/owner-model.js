const knex = require('knex');
const config = require('../../knexfile.js');
const db = knex(config.development);

module.exports = {
	find,
	findById,
	findById,
	update
};

function find() {
	return db('users');
}

function findById(id) {
	return db('tenant').where({ id }).first();
}

function findById(id) {
	return db('property').where({ id }).first();
}

function update(id, changes) {
	return db('users').where({ id }).update(changes);
}
