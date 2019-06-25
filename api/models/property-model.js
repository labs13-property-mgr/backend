const db = require('../../data/dbConfig.js');

module.exports = {
  add,
  find,
  findById,
  remove,
  update
};

async function add(property) {
  const [id] = await db('property').insert(property);
  return findById(id);
}

function find() {
  return db('property');
}

function findById(id) {
  return db('property')
    .where({ id })
    .first();
}

function remove(id) {
  return db('property')
    .where({ id })
    .del();
}

function update(id, changes) {
  return db('property')
    .where({ id })
    .update(changes);
}
