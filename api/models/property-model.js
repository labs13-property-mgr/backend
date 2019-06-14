const knex = require('knex')
const config = require('../../knexfile.js')
const db = knex(config.development)

module.exports = {
  add,
  find,
  findById,
  remove,
  update,
  addTenant
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

function remove(id) {
  return db('property')
    .where({ id })
    .del()
}

function update(id, changes) {
  return db('property')
    .where({ id })
    .update(changes)
}

async function addTenant(tenant) {
  const [id] = await db('tenant').insert(tenant)
}

function getTenantsByPropId(PropId) {
  return db('tenants').where({ PropId })
}
