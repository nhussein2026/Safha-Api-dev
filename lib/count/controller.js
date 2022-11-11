// const { sequelize } = require("../../models")
var models = require('../../models')
// const Connection = require("mysql2/typings/mysql/lib/Connection")

var count = async function(req, res, next) {
    var response = {
        success: true,
        data: {
            usersCount: 0,
            booksCount: 0,
            reviewsCount: 0
        },
        messages: []
    }
    var noUsers = await models.User.count()
    var noBooks = await models.Book.count()
    var noReviews = await models.Review.count()

    response.data.usersCount = noUsers
    response.data.booksCount = noBooks
    response.data.reviewsCount = noReviews
    
    res.send(response)
}

module.exports = { 
    count
}