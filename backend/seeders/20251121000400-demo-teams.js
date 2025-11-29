'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("Teams", [
      {
        organisation_id: 1,
        name: "Engineering",
        description: "Product Development Team",
        created_at: new Date(),
      },
      {
        organisation_id: 1,
        name: "HR",
        description: "Human Resources Team",
        created_at: new Date(),
      },
      {
        organisation_id: 1,
        name: "Sales",
        description: "Sales & Marketing Team",
        created_at: new Date(),
      },
      {
        organisation_id: 1,
        name: "Support",
        description: "Customer Support Team",
        created_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Teams", null, {});
  },
};
