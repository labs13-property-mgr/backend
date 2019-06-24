const db = require('../../data/dbConfig.js');

module.exports = {
  add,
  find,
  findById,
  deleteService,
  update
};

async function add(service) {
  const [id] = await db('service_orders').insert(service);
  return findById(id);
}

function find() {
  return db('service_orders');
}

function findById(id) {
  return db('service_orders')
    .where({ id })
    .first();
}

function deleteService(id) {
  return db('service_orders')
    .where({ id })
    .del();
}

// async function update(id, changes) {
//   const [] = await db('service_orders').where({ id }).update(changes);
//   return findById();
// }

function update(id, changes) {
	return db('service_orders').where({ id }).update(changes);
}