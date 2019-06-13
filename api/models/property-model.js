const db = require("../../data/dbConfig.js");

module.exports = {
  add,
  find,
  findById,
  findByUser
}

async function add(property) {
  const [id] = await db('property').insert(property)
  return findById(id)
}

function find() {
  return db('property')
}

function findById(id) {
  return db('property')
    .where({ id })
    .first()
}

async function findByUser(user_id) {
  return await db('property').where({user_id})
}