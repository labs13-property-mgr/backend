exports.seed = function(knex, Promise) {
  const faker = require('faker')
  const fakerData = []
  for (let i = 0; i <= 50; i++) {
    fakerData.push({
      username: faker.internet.userName(),
      password: faker.internet.password(),
      First_name: faker.name.firstName(),
      Last_name: faker.name.lastName(),
      phone: faker.phone.phoneNumber(),
      email: faker.internet.email(),
      address: faker.address.streetAddress(true),
      role: i % 2 === 0 ? 'tenant' : 'landlord'
    })
  }
  return knex('users')
    .truncate()
    .then(() => knex('users').insert(fakerData))
}
