// const { fn } = require('sequelize')
const { Op } = require('sequelize')
var models = require('../../models')

// var store = async (req, res, next) => {

//     var response = {
//         success: true,
//         messages: [],
//         data: {}
//     }

//     // column names
//     var name = req?.body?.name?.trim()
//     var des = req?.body?.des?.trim()
//     var bookId = Number(req?.body?.bookId)

//     //  Check the input values
//     if (name.length < 3) {
//         response.success = false
//         response.messages.push('name is not a VALID!!, try again')
//         return res.send(response)
//     }
//     if (des.length < 3) {
//         response.success = false
//         response.messages.push('The description length should be more than 5')
//         return res.send(response)
//     }
//     if (!bookId || bookId < 1) {
//         response.success = false
//         response.messages.push('This field should be a number.')
//     }
//     // if the response is false return
//     if (!response.success) {
//         res.send(response)
//         return
//     }

//     // store a new item
//     try {
//         var newPublisher = await models.Publisher?.create({
//             name: name,
//             des: des,
//             bookId: bookId,
//         })
//         response.data = newPublisher
//         response.messages.push('A new item has been added successfully.')
//         res.send(response)
//     } catch (err) {
//         console.log('ERORR-->', err)
//         response.success = false
//         response.messages.push("Something went wrong! Please try again later")
//         res.send(response)
//     }

// }

var search = async function (req, res, next) {
    var response = {
        success: true,
        data: {},
        messages: []
    }
    try {
        var search = {
            author: req?.body?.author,
            date: req?.body?.date,
            name: req?.body?.name,
            ISBN: req?.body?.ISBN,
            category: req?.body?.category
        }

        var terms = {}
        if (search.author) {
            terms.author = {
                [Op.like]: `%${search.author}%`
            }
        }
        if (search.ISBN) {
            terms.ISBN = search.ISBN
        }
        if (search.name) {
            terms.name = {
                [Op.like]: `%${search.name}%`
            }
        }
        const categoryName = await models.Category.findOne({
            where: {
                name: { [Op.like]: `%${search.category}%` }
            }
        })
        if (search.category) {
            terms.categoryId = categoryName.id
        }
    
        var books = await models.Book.findAll({
            where: terms,

            include: [
                { model: models.User, as: 'Creator' },
                { model: models.Review },
                { model: models.Publisher },
                { model: models.Category },
                { model: models.Rate },
            ]
            // attributes: { exclude: ['deletedAt', 'createdAt', 'updatedAt'] },
            // include: [
            //     {
            //         model: models.User, as: 'Added Books' ,
            //         attributes:
            //             { exclude: ['deletedAt', 'createdAt', 'updatedAt'] }
            //     },
            //     {
            //         model: models.Review,
            //         attributes: {
            //             exclude: ['deletedAt', 'createdAt', 'updatedAt']
            //         }
            //     },
            //     {
            //         model: models.Publisher,
            //         attributes: {
            //             exclude: ['deletedAt', 'createdAt', 'updatedAt']
            //         }
            //     },
            //     {
            //         model: models.Category,
            //         attributes: {
            //             exclude: ['deletedAt', 'createdAt', 'updatedAt']
            //         }
            //     },
            //     {
            //         model: models.Rate,
            //         attributes: {
            //             exclude: ['deletedAt', 'createdAt', 'updatedAt']
            //         }
            //     },
            // ]
        })

        if (Array?.isArray(books)) {
            response.data = books
        } else {
            res.status(404)
            res.success = false
            response.messages.push('Please try again later')
        }
    } catch (err) {
        console.log('ERORR-->', err)
        response.success = false
        response.messages.push('Something went wrong! Please try again later')
    }
    res.send(response)
}

module.exports = {
    search
}