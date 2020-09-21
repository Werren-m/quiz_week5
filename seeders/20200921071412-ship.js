'use strict';
const fs = require('fs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const parseData = JSON.parse(fs.readFileSync('./ships.json'));
    const shipsData = [];
    
      parseData.forEach(data => {  
        const { name, type, power } = data;
        shipsData.push({
          name,
          type,
          power,
          createdAt : new Date(),
          updatedAt : new Date()
        })
      })
      await queryInterface.bulkInsert('Ships', shipsData, {});

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
