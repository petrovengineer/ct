const usersTypes = require('./user');
const observationTypes = require('./observation')
const filterTypes = require('./filter')

module.exports = {
    ...usersTypes,
    ...observationTypes,
    ...filterTypes
}