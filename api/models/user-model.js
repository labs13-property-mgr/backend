const db = require("../../data/dbConfig.js");

module.exports = {
  add,
  find,
  findById,
  findPropByUser
}

async function add(user) {
  const [id] = await db('users').insert(user)
  return findById(id)
}

function find() {
  return db('users')
}

function findById(id) {
  return db('users')
    .where({ id })
    .first()
}

async function findPropByUser(owner_id) {
  return await db('property').where({owner_id})
}