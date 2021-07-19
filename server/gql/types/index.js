const usersTypes = require('./users');
const observationTypes = require('./observation')
const filterTypes = require('./filter')

module.exports = {
    ...usersTypes,
    ...observationTypes,
    ...filterTypes
}