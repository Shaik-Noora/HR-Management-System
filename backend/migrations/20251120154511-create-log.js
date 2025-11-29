module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Logs", {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      organisation_id: Sequelize.INTEGER,
      user_id: Sequelize.INTEGER,
      action: Sequelize.STRING,
      meta: Sequelize.JSON,

      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("Logs");
  }
};
