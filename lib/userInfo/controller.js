var models = require('../../models')

var store = async (req, res, next) => {
    
    var response = {
        success: true,
        messages: [],
        data: {}
    }

    // column names
    var usersId = Number(req?.body?.usersId)
    var nickname = req?.body?.nickname.trim()
    var des = req?.body?.des.trim()    
    // var avatar = req?.body?.avatar.trim()
    // var bgPic = req?.body?.bgPic.trim()

    //  Check the input values
    if(!usersId || usersId < 1){
        response.success = false
        response.messages.push('This field should be a number.')
    }
    if(!nickname || nickname?.length < 2){
        response.success = false
        response.messages.push('Nickname should have more than 2 letters.')
    }
    if (!des || des?.length < 5) {
        response.success = false
        response.messages.push('Description should have more than 5 letters.')
    }
    // if (!avatar || avatar?.length < 2) {
    //     response.success = false
    //     response.messages.push('Avatar should have more than 2 letters.')
    // }
    // if(!bgPic || bgPic?.length < 1){
    //     response.success = false
    //     response.messages.push('Background-picture should have at least 2 letters.')
    // }
    
    // if the response is false return
    if (!response.success) {
        res.send(response)
        return
    }

    const bgPicPhoto = req?.file?.filename
    // var bgPicPhoto = []
    // if (req?.files) {
    //     bgPicPhoto.push({
    //         file: req.files[i].filename
    //     })
    // }

    try {
        // store a new item
        var newUserInfo = await models?.UserInfo?.create({
            usersId: usersId,
            nickname: nickname,
            des: des,
            Photo: {
                file: bgPicPhoto,
                photoableType: 'userInfo'
            },
            include: [
                models?.Photo
            ]
        })
        response.data = newUserInfo
        response.messages.push('A new item has been added successfully.')
    } catch (err) {
        console.log('ERORR-->', err)
        response.success = false
        response.messages.push('Something went wrong! Please try again later')
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
        var userInfos = await models?.UserInfo?.findAll()

        if (Array?.isArray(userInfos)) {
            response.data = userInfos
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

var show = async function (req, res, next) {
    var response = {
        success: true,
        data: {},
        messages: []
    }
    try {
        var userInfo = await models?.UserInfo?.findByPk(req?.params?.id)

        if(userInfo) {
            response.data = userInfo
        } else {
            res.status(404)
            response.success = false
            response.messages.push('Please Provide a valid ID')
        }
    } catch (err) {
        console.log('ERORR-->', err)
        response.success = false
        response.messages.push('Something went wrong! Please try again later')
    }
    res.send(response)
}

var destroy = async function (req, res, next) {
    var response = {
        success: true,
        data: {},
        messages: []
    }

    try {
        var id = req?.params?.id

        var deleted = await models?.UserInfo?.destroy({
            where: {
                id: id
            }
        });

        if (deleted) {
            res.status(200)
            response.messages.push('UserInfo has been deleted')
        } else {
            res.status(404)
            response.success = false
            response.success.push('Please try again')
        }
    } catch (err) {
        console.log('ERORR-->', err)
        response.success = false
        response.messages.push('Something went wrong! Please try again later')
    }
    res.send(response)
}

var update = async (req, res, next) => {

    var response = {
        success: true,
        messages: [],
        data: {}
    }
    // column names
    var usersId = Number(req?.body?.usersId)
    var nickname = req?.body?.nickname.trim()
    var des = req?.body?.des.trim()    
    var avatar = req?.body?.avatar.trim()
    var bgPic = req?.body?.bgPic.trim()

    //  Check the input values
    if(!usersId || usersId < 1){
        response.success = false
        response.messages.push('The userId should be a number.')
    }
    if(!nickname || nickname?.length < 2){
        response.success = false
        response.messages.push('The nickname should have more than 2 letters.')
    }
    if (!des || des?.length < 5) {
        response.success = false
        response.messages.push('The description should have more than 5 letters.')
    }
    if (!avatar || avatar?.length < 2) {
        response.success = false
        response.messages.push('The avatar should have more than 2 letters.')
    }
    if(!bgPic || bgPic?.length < 1){
        response.success = false
        response.messages.push('The bgPic should have at least 2 letters.')
    }
    
    // if the response is false return
    if (!response.success) {
        res.send(response)
        return
    }
    try { 
        var id = req?.params?.id
        // store a new item
        var updateUserInfo = await models?.UserInfo?.update({
            usersId: usersId,
            nickname: nickname,
            des: des,
            avatar: avatar,
            bgPic: bgPic,
        }, {
                where: {
                    id
                }
        })
        response.data = updateUserInfo
        if (response.data == 1) {
            res.status(200)
            response.messages.push('Item has been updated successfully.')
        } else {
            res.status(404)
            response.success = false
            response.messages.push('Please try again later.')
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
    index,
    show,
    destroy,
    update
}