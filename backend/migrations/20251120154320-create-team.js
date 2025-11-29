module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Teams", {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      organisation_id: {
        type: Sequelize.INTEGER,
        references: { model: "Organisations", key: "id" },
        onDelete: "CASCADE"
      },
      name: Sequelize.STRING,
      description: Sequelize.TEXT,

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
    await queryInterface.dropTable("Teams");
  }
};
