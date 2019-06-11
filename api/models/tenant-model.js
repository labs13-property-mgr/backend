const knex = require('knex')
const config = require('../../knexfile.js')
const db = knex(config.development)

module.exports = {
  add,
  find,
  findById
}

async function add(tenant) {
  const [id] = await db('tenant').insert(tenant)
  return findById(id)
}

function find() {
  return db('tenant')
}

function findById(id) {
  return db('tenant')
    .where({ id })
    .first()
}