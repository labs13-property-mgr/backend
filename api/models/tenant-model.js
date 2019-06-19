const db = require("../../data/dbConfig.js");

module.exports = {
  add,
  find,
  findById
};

async function add(tenant) {
  const [id] = await db("tenant as t").insert(tenant);
  return findById(id)
    .join("users as u", "t.user_id", "u.id")
    .join("property as p", "t.property_id", "p.id")
    .select("t.*", "u.name as tenant_name", "p.property_name");
}

function find() {
  return db("tenant as t").join("users as s", "t.user_id", "s.id"); // this is how you join a table
}

function findById(id) {
  return db("tenant")
    .where({ id })
    .first();
}
