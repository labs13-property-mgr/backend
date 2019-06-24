const db = require('../../data/dbConfig.js');

module.exports = {
  add,
  insert, // larry function
  get,
  getById,
  remove,
  update,
  addTenant
};

async function add(property) {
  const [id] = await db('property').insert(property);
  return getById(id);
}

function insert(property) {
  return db('property')
    .insert(property)
    .then(ids => ({
      id: ids[0]
    }));
}

function get() {
  return db('property');
}

function getById(id) {
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

async function addTenant(tenant) {
  const [id] = await db('tenant').insert(tenant);
}
