var models = require('../../models')
var transformers = require ('../../transformers')

var store = async function (req, res, next) {
    var response = {
        success: true,
        messages: [],
        data: {}
    }
    try {
        var type = req?.body?.type?.trim()
        // if (!type.length < 3 || (!type.match('admin') || !type.match('user')))
        if (type.length < 3 ) {
            response.success = false
            response.messages.push('Type should be more than 3 letters')
        }
        if (!response.success) {
            res.send(response)
            return
        }

        var newType = await models.UserType?.create({
            type: type,

        })
        response.data = newType
        response.messages.push('You add a new type Successfully')
      
    } catch (err) {
        console.log('ERORR-->', err)
        response.success = false
        response.messages.push('Something went wrong! Please try again later')
    }
    res.send(response)
}
var show = async function (req, res, next) {
    var result = {
        success: true,
        data: {},
        messages: []
    }
    var id = Number(req.params.id)
    var usersType = await models.UserType?.findByPk(id, {
        include: [
            models.User
        ]
    })
    if (usersType) {
        // result.data = usersType
        result.data= transformers.userTypeTransformer(usersType)
    } else {
        res.status(404)
        result.messages.push('Please Provide a valid ID')
    }
    res.send(result)
}
var index = async function (req, res, nex) {
    var result = {
        success: true,
        data: {},
        messages: []
    }
    try {
        var types = await models.UserType?.findAll({
            include: [
                models.User
            ]
        })
        if (Array.isArray(types)) {
            // result.data = types
            // result.data= transformers.userTypeTransformer(types)
            result.data= types
        } else {
            res.status(404)
            res.success = false
            result.messages.push('Please Try again later')
        }
    } catch (err) {
        console.log('ERORR-->', err)
        response.success = false
        response.messages.push('Something went wrong! Please try again later')
    }
    res.send(result)
}
var destroy = async function (req, res, nex) {
    var response  = {
        success: true,
        data: {},
        messages: []
    }
    var id = Number(req?.params?.id)
    var deleted = await models.UserType?.destroy({
        where: {
            id: id
        }
    });
    if (deleted) {
        response.messages.push('userType has been deleted.')
    } else {
        res.status(404)
        response.success = false
        response.messages.push('Please try again later.')
    }
    res.send(response)
}
var update = async function (req, res, next) {
    var response = {
        success: true,
        messages: [],
        data: {}
    }
    var type = req.body.type.trim()
    if (!response.success) {
        res.send(response)
        return
    }
    try {
        var id = Number(req.params.id)
        var updateType = await models.UserType.update({
            type: type,
        }, {
            where: {
                id
            }
        })
        response.data = updateType
        if (updateType) {
            res.status(200)
            response.messages.push('Typed has been update created successfully')
        } else {
            res.status(400)
            result.success = false
            result.messages.push('Can not add new type now, try again later!!')
        }
    } catch (err) {
        console.log('ERORR-->', err)
        response.success = false
        response.messages.push('Something went wrong! Please try again later')
    }
    res.send(response)
}

module.exports = {
    store,
    show,
    index,
    destroy,
    update
}