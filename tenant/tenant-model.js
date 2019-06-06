const knex = require('knex');
const config = require('../knexfile.js');
const db = knex(config.development);

module.exports = {
	add,
	findById
};

async function add(user) {
	const [ id ] = await db('users').insert(user);
	return findById(id);
}

function findById(id) {
	return db('users').where({ id }).first();
}
