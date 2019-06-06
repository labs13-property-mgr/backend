const knex = require('knex');
const config = require('../knexfile.js');
const db = knex(config.development);

module.exports = {
	add,
	find,
	findById
};

async function add(property) {
	const [ id ] = await db('property').insert(property);
	return findById(id);
}

function find() {
	return db('property');
}

function findById(id) {
	return db('property').where({ id }).first();
}
