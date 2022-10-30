var models = require('../../models')

var store = async (req, res, next) => {

    var response = {
        success: true,
        messages: [],
        data: {}
    }

    // column names
    var userId = Number(req?.body?.userId)
    var likeableId = Number(req?.body?.likeableId)
    var likeableType = req?.body?.likeableType.trim()

    //  Check the input values
    if (!userId || userId < 1) {
        response.success = false
        response.messages.push('This field should be a number.')
    }
    if (!likeableId || likeableId < 1) {
        response.success = false
        response.messages.push('This field should be a number.')
    }
    if (!likeableType || (!likeableType.match('comment') && !likeableType.match('review'))) {
        response.success = false
        response.messages.push('This field is wrong.')
    }

    // if the response is false return
    if (!response.success) {
        res.send(response)
        return
    }
    try {
        var newLike = await models?.like?.create({
            userId: userId,
            likeableId: likeableId,
            likeableType: likeableType
        })
        response.data = newLike
        response.messages.push('A new like have been added successfully.')
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
        var likes = await models?.like?.findAll()

        if (Array?.isArray(likes)) {
            response.data = likes
        } 
       
    } catch (err) {
        console.log('ERORR-->', err)
        response.success = false
        response.messages.push('Something went wrong! Please try again later')
    }
    res.send(response)
}

// var show = async function (req, res, next) {
//     var response = {
//         success: true,
//         data: {},
//         messages: []
//     }
//     var like = await models?.like?.findByPk(req.params.id,{
//         // include: [
//         //     { 
//         //         model: models.Review,
//         //     },
//         //     {
//         //         model: models.category
//         //     }
//         // ]
//     })

//     if(like) {
//         response.data = like
//     } else {
//         res.status(404)
//         response.messages.push('Please Provide a valid ID')
//     }
//     res.send(response)
// }

var destroy = async function (req, res, next) {
    var response = {
        success: true,
        data: {},
        messages: []
    }
    var id = req.params.id

    var deleted = await models?.like?.destroy({
        where: {
            id: id
        }
    });

    if (deleted) {
        res.status(200)
        response.messages.push('Like has been deleted')
    } else {
        res.status(404)
        response.success = false
        response.success.push('Please try again')
    }
    res.send(response)
}

module.exports = {
    store,
    index,
    // show,
    destroy,
    // update
}