const db = require('../../data/dbConfig.js');

module.exports = {
	add,
	find,
	findById,
	update,
	remove
};

async function add(tenant) {
	const [ id ] = await db('tenant').insert(tenant);
	return findById(id);
}

function find() {
	return db('tenant');
}

function findById(id) {
	return db('tenant').where({ id }).first();
}

function update(id, changes) {
	return db('tenant').where({ id }).update(changes);
}

function remove(id) {
	return db('tenant').where({ id }).del();
}
