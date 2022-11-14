const { Op } = require('sequelize')
var models = require('../../models')

var rate = async (req, res, next) => {
    
    var response = {
        success: true,
        messages: [],
        data: {}
    }

    var bookId = Number(req?.body?.bookId)
    var rate = Number(req?.body?.rate)

    //  Check the input values
    if(!rate || rate < 1 || rate > 5 ){
        response.success = false
        response.messages.push('The entered rate should not be less than one or larger than 5')
    }
    if (!bookId || bookId < 1) {
        response.success = false
        response.messages.push('The book is wrong.')
    }

    // if the response is false return
    if (!response.success) {
        res.send(response)
        return
    }

    try {
        // store a new category
        var [newRate, created] = await models.Rate?.findOrCreate({
            where: {
                [Op.or]: [{ userId }, { bookId }]
            },
            defaults:{
                userId: req?.user?.id,
                bookId: bookId,
                rate: rate,
            }
        });
        console.log('created',created)
        if (created) {
            response.data = newRate
            res.status(200)
            response.messages.push('A new Rate has been add successfully')
        } else {
            res.status(404)
            response.success = false
            response.messages.push('You are already rated, Please go to login')
        }
    } catch (err) {
        console.log('ERORR-->', err)
        response.success = false
        response.messages.push("You already rated this book.")
    }
    res.send(response)
}
module.exports = { 
    rate
}