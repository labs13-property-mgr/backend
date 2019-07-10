const db = require("../../data/dbConfig.js");

module.exports = {
  add,
  find,
  findById,
  deleteService,
  update,
  insert,
  get
};

async function add(service) {
  const [id] = await db("service_orders").insert(service);
  return findById(id);
}

function find() {
  return db("service_orders");
}

function findById(id) {
  return db("service_orders")
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

function insert(request) {
  return db("service_orders")
    .insert(request)
    .then(ids => ({ id: ids[0] }));
}

function get(request) {
  if (id) {
    return db("service_orders")
      .where({ id: Number(id) })
      .first();
  } else {
    return db("service_orders");
  }
}
