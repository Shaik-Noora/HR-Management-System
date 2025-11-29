'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("Logs", [
      {
        organisation_id: 1,
        user_id: 1,
        action: "system_seeded",
        meta: JSON.stringify({ info: "Initial HRMS demo data loaded" }),
        created_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Logs", null, {});
  },
};
