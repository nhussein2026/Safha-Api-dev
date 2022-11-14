const { Op } = require('sequelize')
var models = require('../../models')

var store = async (req, res, next) => {

    var response = {
        success: true,
        messages: [],
        data: {}
    }

    // column names
    var userId = Number(req?.body?.userId)
    var bookId = Number(req?.body?.bookId)

    //  Check the input values
    if (!userId || userId < 1) {
        response.success = false
        response.messages.push('This field should be a number.')
    }
    if (!bookId || bookId < 1) {
        response.success = false
        response.messages.push('This field should be a number.')
    }
    // if the response is false return
    if (!response.success) {
        res.send(response)
        return
    }

    // store a new item
    try {
        var [newFavorite, created] = await models.Favorite?.findOrCreate({
            where:{
                [Op.or]: [{ userId }, { bookId }]
            },
            defaults: {
                userId: userId,
                bookId: bookId,
            }
        })
        if (created) {
            response.data = newFavorite
            response.messages.push('A new favorite has been added successfully.')
        } else {
            res.status(404)
            response.success = false
            response.messages.push('You are already added this item to favorite.')
        }
        
    } catch (err) {
        console.log('ERORR-->', err)
        response.success = false
        response.messages.push("Something went wrong! Please try again later")
    }
    res.send(response)
}

var index = async function (req, res, next) {
    var response = {
        success: true,
        data: {},
        messages: []
    }
    try {
        var favorites = await models.favorite?.findAll()

        if (Array?.isArray(favorites)) {
            response.data = favorites
        } else {
            res.success = false
            res.status(404)
            response.messages.push('Please try again later')
        }
    } catch (err) {
        console.log('ERORR-->', err)
        response.success = false
        response.messages.push('Something went wrong! Please try again later')
    }
    res.send(response)
}

var show = async function (req, res, next) {
    var response = {
        success: true,
        data: {},
        messages: []
    }
    // var favorite = await models.favorite?.findByPk(req?.params?.id)
    var favorite = await models.favorite?.findByPk(req?.params?.id)

    if (favorite) {
        response.data = favorite
    } else {
        res.status(404)
        response.success = false
        response.messages.push('Please Provide a valid ID')
    }
    res.send(response)
}

var destroy = async function (req, res, next) {
    var response = {
        success: true,
        data: {},
        messages: []
    }
    var id = req?.params?.id

    var deleted = await models.favorite?.destroy({
        where: {
            id: id
        }
    });

    if (deleted) {
        res.status(200)
        response.messages.push('Item has been removerd from Favorite list')
    } else {
        res.status(404)
        response.success = false
        response.messages.push('Please try again later.')
    }
    res.send(response)
}
// var destroy = async function (req, res, next) {
//     var response = {
//         success: true,
//         data: {},
//         messages: []
//     }
//     // var id = req?.params?.id

//     var deleted = await models.favorite?.destroy({
//         // where: {
//         //     id: id
//         // }
//     });

//     if (deleted) {
//         res.status(200)
//         response.messages.push('Item has been removerd from Favorite list')
//     } else {
//         res.status(404)
//         response.success = false
//         response.messages.push('Please try again later.')
//     }
//     res.send(response)
// }


module.exports = {
    store,
    index,
    show,
    destroy
}