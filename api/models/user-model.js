const db = require('../../data/dbConfig.js');

module.exports = {
  add,
  find,
  findById,
  findPropByUser,
  findByEmail,
  update,
  remove,
  insert
};

async function add(user) {
  const [id] = await db('users').insert(user);
  return findById(id);
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

//larry simiyu test code
function insert(user) {
  return db('users')
    .insert(user)
    .then(ids => ({
      id: ids[0]
    }));
}
