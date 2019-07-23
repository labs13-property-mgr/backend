const db = require("../../data/dbConfig.js");

module.exports = {
  add,
  find,
  findById,
  deleteService,
  update,
  addHistory
};

function add(service) {
  return db("service_orders").insert(service);
}
// async function add(service) {
//   const [id] = await db('service_orders').insert(service);
//   return findById(id);
// }

async function addHistory(service) {
  return db("service_history").insert(service);
  // const [id] = await db("service_history").insert(service);
  // return findHistoryById(id);
}

function find() {
  return db("service_orders");
}

function findById(id) {
  return db("service_orders")
    .where({ id })
    .first();
}

function findHistoryById(id) {
  return db("service_history")
    .where({ id })
    .first();
}

function deleteService(id) {
  return db("service_orders")
    .where({ id })
    .del();
}

function update(id, changes) {
  return db("service_orders")
    .where({ id })
    .update(changes);
}
