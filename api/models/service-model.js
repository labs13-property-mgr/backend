const db = require("../../data/dbConfig.js");

module.exports = {
    add,
    find,
    findById
  }
  
  async function add(service) {
    const [id] = await db('service_orders').insert(service)
    return findById(id)
  }
  
  function find() {
    return db('service_orders')
  }
  
  function findById(id) {
    return db('service_orders')
      .where({ id })
      .first()
  }
  