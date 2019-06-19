// exports.seed = function(knex, Promise) {
//   const faker = require('faker');
//   const arrFaker = [];
//   for (let i = 0; i <= 50; i++) {
//     const name = faker.hacker.adjective().replace(/\s|-/g, '');
//     const name1 = faker.hacker.ingverb();
//     arrFaker.push({
//       property_name:
//         i % 2 === 0
//           ? `${name.charAt(0).toUpperCase() + name.slice(1)} Manor`
//           : `${name.charAt(0).toUpperCase() + name.slice(1)} House`,
//       address: faker.address.streetAddress(true)
//     });
//   }
//   return knex('property').then(() => knex('property').insert(arrFaker));
// };
