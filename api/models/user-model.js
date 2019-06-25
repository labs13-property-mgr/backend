const db = require('../../data/dbConfig.js');

module.exports = {
  find,
  findById,
  findPropByUser,
  findByEmail,
  update,
  remove,
  add
};

function add(user) {
  return db('users').insert(user);
}

function find() {
  return db('users');
}

function findById(id) {
  return db('users')
    .where({ id })
    .first();
}

function findByEmail(email) {
  return db('users')
    .where({ email })
    .first();
}

async function findPropByUser(owner_id) {
  return await db('property').where({ owner_id });
}

function update(id, changes) {
  return db('users')
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db('users')
    .where({ id })
    .del();
}
