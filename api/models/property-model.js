const db = require('../../data/dbConfig.js');

module.exports = {
  add,
  find,
  findById,
  remove,
  update
};

function add(property) {
  return db('property').insert(property);
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
