// const { sequelize } = require("../../models")
var models = require('../../models')
// const Connection = require("mysql2/typings/mysql/lib/Connection")

var countUsers = async function(req, res, next) {
    var response = {
        success: true,
        data: {},
        messages: []
    }
    var noUsers = await models.User.count()
    if(noUsers){
        response.data = noUsers
    }else {
        res.status(404)
        response.success = false
        response.messages.push('Please Provide a valid route')
    }
    
    res.send(response)
}

module.exports = {
    countUsers
}