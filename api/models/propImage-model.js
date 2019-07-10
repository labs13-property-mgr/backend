const db = require('../../data/dbConfig.js');

module.exports = {
  add,
  find,
  findById,
  update,
  remove
};

function add(image) {
  return db('property_images').insert(image);
}

function find() {
  return db('property_images');
}

function findById(id) {
  return db('property_images')
    .where({ id })
    .first();
}

function update(id, changes) {
  return db('property_images')
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db('property_images')
    .where({ id })
    .del();
}
