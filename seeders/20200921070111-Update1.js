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

    const parseData = JSON.parse(fs.readFileSync('./data.json'));
    const piratesData = [];
    
    parseData.forEach(data => {  
      const { name, status, haki } = data;
      piratesData.push({
        name,
        status,
        haki,
        createdAt : new Date(),
        updatedAt : new Date()
      })
    })
    await queryInterface.bulkInsert('Pirates', piratesData, {});
   
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
