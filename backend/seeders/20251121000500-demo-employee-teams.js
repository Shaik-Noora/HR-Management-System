'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("employee_teams", [
      { employee_id: 1, team_id: 1 },
      { employee_id: 2, team_id: 1 },
      { employee_id: 3, team_id: 2 },
      { employee_id: 4, team_id: 3 },
      { employee_id: 5, team_id: 3 },
      { employee_id: 6, team_id: 4 },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("employee_teams", null, {});
  },
};
