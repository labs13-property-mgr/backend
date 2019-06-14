const db = require('../../data/dbConfig.js');

module.exports = {
	add,
	find,
	findById,
	remove,
	update
};

async function add(vendor) {
	const [ id ] = await db('vendor').insert(vendor);
	return findById(id);
}

function find() {
	return db('vendor');
}

function findById(id) {
	return db('vendor').where({ id }).first();
}

function remove(id) {
	return db('vendor').where({ id }).del();
}

function update(id, changes) {
	return db('vendor').where({ id }).update(changes);
}
