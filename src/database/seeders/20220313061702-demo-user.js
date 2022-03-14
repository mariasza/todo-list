'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      email: 'admin@admin.com',
      password: '$2a$08$VCljTHtrTcOlA3iwX7o7oOW.Nvuwu9NC299mOlOuCpVopgWmIEXb2',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
