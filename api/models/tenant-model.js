const db = require("../../data/dbConfig.js");

module.exports = {
  add,
  insert,
  find,
  get,
  findById,
  remove,
  update,
  findServByTenant
};

async function add(tenant) {
  return db("tenant").insert(tenant);
}

//larry simiyu test addition
function insert(tenant) {
  return db("tenant")
    .insert(tenant)
    .then(ids => ({ id: ids[0] }));
}

function find() {
  // return db("tenant as t").join("users as s", "t.owner_id", "s.uid"); // this is how you join a table
  return db("tenant");
}

function get(id) {
  if (id) {
    return db("tenant")
      .where({ id: Number(id) })
      .first();
  } else {
    return db("tenant");
  }
}

function findById(id) {
  return db("tenant")
    .where({ id })
    .first();
}

function remove(id) {
  return db("tenant")
    .where({ id })
    .del();
}

function update(id, changes) {
  return db("tenant")
    .where({ id })
    .update(changes);
}

async function findServByTenant(tenant_id) {
  return await db('service_orders').where({ tenant_id });
}