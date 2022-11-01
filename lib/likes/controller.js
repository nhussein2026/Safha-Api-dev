const { fn, Op } = require('sequelize')
var models = require('../../models')
const { update } = require('../reviews/controller')

var reviewsLike = async (req, res, next) => {

    var response = {
        success: true,
        messages: [],
        data: {}
    }
    const userId = req?.user?.id
    const likeableId = req?.params?.id
    if(!likeableId){
        response.success = false
        response.messages.push('invalid review id')
    }
    if (!response.success) {
        res.send(response)
        return
    }
    const [sharedlike, likedOrDisliked] = await models.like.findOrCreate({
        where: {
            [Op.and]: [{userId}, {likeableId}, {likeableType: "review"}]
        },
        defaults:{
            userId,
            likeableId,    
            likeableType: "review",
            createdAt: fn("now"),
            updateAt: fn("now")
        }
    })
    if(likedOrDisliked){
        response.data = sharedlike
        response.messages.push('A new like have been added successfully.')
        return res.send(response)
    }else {
        if(!sharedlike?.deletedAt) {
            const disLike = await models.like.update({
                deletedAt: fn("now")
            },
            {
                where:{
                    [Op.and]: [{userId}, {likeableId}, {likeableType: "review"}]
                }
            })
            if(Array.isArray(disLike) && disLike[0]){
                response.data = disLike
                response.messages.push('A like have been removed successfully.')
                return res.send(response)
            }else{
                response.success = false
                response.messages.push('A dislike feild')
                return res.send(response)
            }
        }else {
            const disLike = await models.like.update({
                deletedAt: null
            },
            {
                where:{
                    [Op.and]: [{userId}, {likeableId}, {likeableType: "review"}]
                }
            })
            if(Array.isArray(disLike) && disLike[0]){
                response.data = disLike
                response.messages.push('A like have been added successfully.')
                return res.send(response)
            }else{
                response.success = false
                response.messages.push('A dislike feild')
                return res.send(response)
            }
        }
        
    }  
}
var commentsLike = async (req, res, next) => {

    var response = {
        success: true,
        messages: [],
        data: {}
    }

    // column names
    var likeableId = Number(req?.body?.likeableId)
    // if the response is false return
    if (!response.success) {
        res.send(response)
        return
    }
        var newLike = await models?.like?.create({
            likeableId: likeableId,
        })
        response.data = newLike
        response.messages.push('A new like have been added successfully.')
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

var show = async function (req, res, next) {
    var response = {
        success: true,
        data: {},
        messages: []
    }
    var like = await models?.like?.findByPk(req.params.id,{
        // include: [
        //     { 
        //         model: models.Review,
        //     },
        //     {
        //         model: models.category
        //     }
        // ]
    })

    if(like) {
        response.data = like
    } else {
        res.status(404)
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
    reviewsLike,
    index,
    show,
    destroy,
    commentsLike
}