exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('property')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('property').insert([
        { property_name: 'mansiona', address: '333 main st' }
      ])
    })
}
