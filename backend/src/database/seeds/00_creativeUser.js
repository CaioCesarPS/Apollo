
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          "id": 1,
          "name": "Caio César ADMIN",
          "username": "CaioCPS",
          "password": "éBomComerVegetais",
          "phoneNumber": 31999994444,
          "adress": "Rua joboticaba 121",
          "permission": "admin",
        }
      ]);
    });
};
