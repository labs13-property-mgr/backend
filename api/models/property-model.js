const db = require("../../data/dbConfig.js");

module.exports = {
  add,
  find,
  findImages,
  findTenants,
  findById,
  remove,
  update,
  findServByProp,
  findServHisByProp,
  findImages
  // findTenantsByProperty,
};

function add(property) {
  return db("property").insert(property);
}

async function find() {
  const prop = await db("property");
  return prop;
}

function findImages() {
  return db("property as p")
    .join("property_image as i", "p.id", "=", "i.property_id")
    .select([
      "p.id as property_id",
      "p.property_name as property_name",
      "p.address as property_address",
      "i.id as property_image_id",
      "i.image_url as image_url"
    ]);
}

function findTenants() {
  return db("property as p")
    .join("tenant as t", "p.id", "=", "t.property_id")
    .select([
      "p.id as property_id",
      "p.property_name as property_name",
      "p.address as property_address",
      "p.unit as property_unit",
      "p.city as property_city",
      "p.state as property_state",
      "p.zip as property_zip",
      "p.rent as property_rent",
      "p.image_url as image_url",
      "t.id as tenant_id",
      "t.First_name as First_name",
      "t.Last_name as Last_name",
      "t.phone as phone",
      "t.email as tenant_email",
      "t.owner_id as owner_id"
    ]);
}

function findById(id) {
  return db("property")
    .where({ id })
    .first();
}

function remove(id) {
  return db("property")
    .where({ id })
    .del();
}

function update(id, changes) {
  return db("property")
    .where({ id })
    .update(changes);
}

function findTenantsByProperty(filter) {
  console.log(filter);
  return db("property as p")
    .join("tenant as t", "p.id", "=", "t.property_id")
    .select([
      "p.id as property_id",
      "t.id as tenant_id",
      "t.First_name as First_name",
      "t.Last_name as Last_name",
      "t.phone as phone",
      "t.email as email",
      "t.owner_id as owner_id"
    ])
    .where({ "p.id": filter });
}

async function findServByProp(property_id) {
  return await db("service_orders").where({ property_id });
}

async function findServHisByProp(property_id) {
  return await db("service_history").where({ property_id });
}
