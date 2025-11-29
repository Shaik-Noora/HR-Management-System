'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("Employees", [
      {
        organisation_id: 1,
        first_name: "Shaik",
        last_name: "Wasim",
        email: "wasim@demo.com",
        phone: "9999990001",
        created_at: new Date(),
      },
      {
        organisation_id: 1,
        first_name: "Ashiq",
        last_name: "Ali",
        email: "ashiq@demo.com",
        phone: "9999990002",
        created_at: new Date(),
      },
      {
        organisation_id: 1,
        first_name: "Raunaq",
        last_name: "Ali",
        email: "raunaq@demo.com",
        phone: "9999990003",
        created_at: new Date(),
      },
      {
        organisation_id: 1,
        first_name: "Zenab",
        last_name: "Shaik",
        email: "zenab@demo.com",
        phone: "9999990004",
        created_at: new Date(),
      },
      {
        organisation_id: 1,
        first_name: "Navya",
        last_name: "Sri",
        email: "navya@demo.com",
        phone: "9999990005",
        created_at: new Date(),
      },
      {
        organisation_id: 1,
        first_name: "Vinusha",
        last_name: "Vinnu",
        email: "vinusha@demo.com",
        phone: "9999990006",
        created_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Employees", null, {});
  },
};
