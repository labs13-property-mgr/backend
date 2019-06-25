const db = require('../../data/dbConfig.js');

module.exports = {
  insert,
  find,
  findById,
  remove
};

function insert(property) {
  return db('property')
    .insert(property)
    .then(ids => ({
      id: ids[0]
    }));
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
