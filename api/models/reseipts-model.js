const db = require('../../data/dbConfig.js');

module.exports = {
	add,
	find,
	findById,
	remove,
	update
};

async function add(receipt) {
	const [ id ] = await db('receipt').insert(receipt);
	return findById(id);
}

function find() {
	return db('receipt');
}

function findById(id) {
	return db('receipt').where({ id }).first();
}

function remove(id) {
	return db('receipt').where({ id }).del();
}

function update(id, changes) {
	return db('receipt').where({ id }).update(changes);
}
