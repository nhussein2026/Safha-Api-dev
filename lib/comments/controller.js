var models = require("../../models")

var store = async function (req, res, next) {

    var response = {
        success: true,
        messages: [],
        data: {}
    }

    var userId = Number(req?.body?.userId)
    var reviewId = Number(req?.body?.reviewId)
    var content = req?.body?.content.trim()

    if (!userId || userId < 1) {
        response.success = false
        response.messages.push('This field should be a number.')
    }
    if (!reviewId || reviewId < 1) {
        response.success = false
        response.messages.push('This field should be a number.')
    }
    if (!content || content?.length < 5) {
        response.success = false
        response.messages.push('The content length should be more than 5')
    }
    if (!response.success) {
        res.send(response)
        return
    }
    try {
        var newComment = await models?.comment?.create({
            userId: userId,
            reviewId: reviewId,
            content: content,
            include: [
                { model: models?.User },
                { model: models?.Review },
                { model: models?.like },
            ]
        });
        response.data = newComment
        if (newComment) {
            res.status(200)
            response.messages.push('Your comment has been added successfully')
        }
        res.send(response)
    } catch (err) {
        console.log('ERORR-->', err)
        response.success = false
        response.messages.push("Something went wrong! Please try again later")
        res.send(response)
    }

}

var index = async function (req, res, nex) {
    var response = {
        success: true,
        data: {},
        messages: []
    }
    try {
        var allComments = await await models?.comment?.findAll()
        if (Array?.isArray(allComments)) {
            response.data = allComments
        }
    } catch (err){
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
//     var id = Number(req?.params?.id)
//     var comment = await models?.comment?.findByPk(id, {
//         include: [
//             {
//                 model: models?.User
//             },
//         ]
//     })
//     if (comment) {
//         response.data = comment
//     } else {
//         res.status(404)
//         response.success = false
//         response.messages.push('Please provide a Valid ID')
//     }
//     res.send(response)
// }

var destroy = async function (req, res, nex) {
    var response = {
        success: true,
        data: {},
        messages: []
    }
    var id = req?.params?.id
    var deleted = await models?.comment?.destroy({
        where: {
            id: id
        }
    });
    if (deleted) {
        response.messages.push('Your comment has been deleted successfuly')
    } else {
        res.status(404)
        response.success = false
        response.messages.push('Please try again')
    }
    res.send(response)
}

var update = async function (req, res, next) {

    var response = {
        success: true,
        messages: [],
        data: {}
    }

    var userId = Number(req?.body?.userId)
    var reviewId = Number(req?.body?.reviewId)
    var content = req?.body?.content.trim()

    if (!userId || userId < 1) {
        response.success = false
        response.messages.push('This field should be a number.')
    }
    if (!reviewId || reviewId < 1) {
        response.success = false
        response.messages.push('This field should be a number.')
    }
    if (!content || content?.length < 5) {
        response.success = false
        response.messages.push('The content length should be more than 5')
    }
    if (!response.success) {
        res.send(response)
        return
    }
    try {
        var id = req.params.id
        var updateComment = await models?.comment?.update({
            userId: userId,
            reviewId: reviewId,
            content: content,
        }, {
            where: {
                id
            }
        })
        response.data = updateComment
        if (response.data == 1) {
            res.status(200)
            response.messages.push('Your comment has been updated successfully.')
        } else {
            res.status(404)
            response.success = false
            response.messages.push('Please try again later.')
        }
        res.send(response)
        
    } catch (err) {
        console.log('ERORR-->', err)
        response.success = false
        response.messages.push("Something went wrong! Please try again later")
    }
    
}

module.exports = {
    store,
    index,
    // show,
    destroy,
    update
}
