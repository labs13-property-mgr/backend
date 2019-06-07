exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        {
          username: 'auser',
          password: 'pass1233444',
          First_name: 'jimbob',
          Last_name: 'Jones',
          phone: 3844884848,
          email: 'jimbob@aol.com',
          address: '222 West Main St',
          role: 'landlord'
        }
      ])
    })
}
