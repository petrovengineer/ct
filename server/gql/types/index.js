const usersTypes = require('./users');
const observationTypes = require('./observation')

module.exports = {
    ...usersTypes,
    ...observationTypes
}