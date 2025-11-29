'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("Organisations", [
      {
        name: "Noora Tech Pvt Ltd",
        created_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Organisations", null, {});
  },
};
