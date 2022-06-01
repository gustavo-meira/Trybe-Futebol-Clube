'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      home_team: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'teams',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      home_team_goals: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      away_team: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'teams',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      away_team_goals: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      in_progress: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
    }, {
      timestamps: false,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};