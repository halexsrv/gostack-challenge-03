module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('delivery_problems', 'delivery_id', {
      type: Sequelize.INTEGER,
      references: { model: 'delivery', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('delivery_problems', 'delivery_id');
  },
};
