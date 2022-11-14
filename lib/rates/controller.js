const { Op, fn } = require('sequelize')
var models = require('../../models')

// var rate1 = async (req, res, next) => {
    
//     var response = {
//         success: true,
//         messages: [],
//         data: {}
//     }

//     var bookId = Number(req?.body?.bookId)
//     var rate = Number(req?.body?.rate)
//     var userId = Number(req?.user?.id)
//     //  Check the input values
//     if(!rate || rate < 1 || rate > 5 ){
//         response.success = false
//         response.messages.push('The entered rate should not be less than one or larger than 5')
//     }
//     if (!bookId || bookId < 1) {
//         response.success = false
//         response.messages.push('The book is wrong.')
//     }

//     // if the response is false return
//     if (!response.success) {
//         res.send(response)
//         return
//     }

//     try {
//         // store a new category
//         var [newRate, created] = await models.Rate?.findOrCreate({
//             where: {
//                 [Op.or]: [{ userId }, { bookId }]
//             },
//             defaults:{
//                 userId: userId,
//                 bookId: bookId,
//                 rate: rate,
//             }
//         });
//         // console.log('created',created)
//         if (created) {
//             response.data = newRate
//             res.status(200)
//             response.messages.push('A new Rate has been add successfully')
//         } else {
//             var deleted = await models.Rate?.destroy({
//                 where: {
//                     [Op.and]: [{ userId }, { bookId }, {rate}]
//                 }
//             });
//             if (deleted) {
//                 response.messages.push('A rate have been removed.')
//             } else {
//                 response.success = false
//                 response.messages.push('try again later')
//                 return res.send(response)
//             }
//             // res.status(404)
//             // response.success = false
//             // response.messages.push('You are already rated, ')
//         }
//     } catch (err) {
//         console.log('ERORR-->', err)
//         response.success = false
//         response.messages.push("You already rated this book.")
//     }
//     res.send(response)
// }

var rate = async (req, res, next) => {
    var response = {
        success: true,
        messages: [],
        data: {}
    }
    var bookId = Number(req?.body?.bookId)
    var rate = Number(req?.body?.rate)
    var userId = Number(req?.user?.id)

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
    
    const [SharedRate, isRated] = await models.Rate.findOrCreate({
        where: {
            [Op.and]: [{ userId }, { bookId }, { rate }]
        },
        defaults: {
            userId,
            bookId,
            rate,
        }
    })
    console.log("rate",SharedRate)
    console.log("isRated",isRated)
    if (isRated) {
        response.data = SharedRate
        response.messages.push('A new rate have been added successfully.')
        return res.send(response)
    } else {
        if (!rate?.deletedAt) {
            const unRate = await models.Rate.destroy(
                {
                    where: {
                        [Op.and]: [{ userId }, { bookId }, { rate }]
                    }
                })
            if (Array.isArray(unRate) && unRate[0]) {
                response.data = unRate
                response.messages.push('A rate have been removed successfully.')
                return res.send(response)
            } else {
                response.success = false
                response.messages.push('A unRate failed')
                return res.send(response)
            }
        } else {
            const unRate = await models.Rate.update({
                deletedAt: null
            },
                {
                    where: {
                        [Op.and]: [{ userId }, { bookId }, { rate }]
                    }
                })
            if (Array.isArray(unRate) && unRate[0]) {
                response.data = unRate
                response.messages.push('A rate has been added successfully.')
                return res.send(response)
            } else {
                response.success = false
                response.messages.push('A unRate failed')
                return res.send(response)
            }
        }

    }
}


module.exports = { 
    rate,
}