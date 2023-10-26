var models = require('../../models')
var transformers = require ('../../transformers')
const { userInfosTransformer, userInfoTransformer } = require('../../transformers/userInfoTransformer')


var store = async (req, res, next) => {
    console.log(req.files)
    var response = {
        success: true,
        messages: [],
        data: {}
    }

    // column names
    var nickname = req?.body?.nickname.trim()
    var des = req?.body?.des.trim()    

    if(!nickname || nickname?.length < 2){
        response.success = false
        response.messages.push('Nickname should have more than 2 letters.')
    }
    if (!des || des?.length < 5) {
        response.success = false
        response.messages.push('Description should have more than 5 letters.')
    }
    
    // if the response is false return
    if (!response.success) {
        res.send(response)
        return
    }
    // console.log("bgPicPhoto",req)
    const bgPicPhoto = req?.files?.bgPic[0]?.filename
    console.log("bgPicPhoto",req.file)
    const avatarPhoto = req?.files?.avatar[0]?.filename
    console.log("avatarPhoto",req.file)
    var id = req?.user?.id
    try {
        // store a new item
        var [newUserInfo, created ] = await models.UserInfo?.findOrCreate({
            where:{
                userId: id
            },
            defaults:{
                userId: id,
                nickname: nickname,
                des: des,
                avatar: avatarPhoto,
                bgPic: bgPicPhoto,
            }
        })
        // console.log(req.user.id)
        if (created) {
            res.status(200)
            response.data = newUserInfo
            response.messages.push('A new item has been added successfully.')
        } else {
            res.status(404)
            response.success = false
            response.messages.push('You are already registered.')
        }
        
    } catch (err) {
        console.log('ERORR-->', err)
        response.success = false
        response.messages.push('You only can create one user Info.')
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
        var userInfos = await models.UserInfo?.findAll({
            attributes: { exclude: ['deletedAt', 'createdAt', 'updatedAt'] },
         } )

        if (Array?.isArray(userInfos)) {
            response.data = userInfosTransformer(userInfos)
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

// var show = async function (req, res, next) {
//     var response = {
//         success: true,
//         data: {},
//         messages: []
//     }
//     try {
//         var userInfo = await models.UserInfo?.findByPk(req?.params?.id,
//             {
//                 attributes: { exclude: ['deletedAt', 'createdAt', 'updatedAt'] },
//              } )

//         if(userInfo) {
//             response.data = userInfoTransformer(userInfo)

//         } else {
//             res.status(404)
//             response.success = false
//             response.messages.push('Please Provide a valid ID')
//         }
//     } catch (err) {
//         console.log('ERORR-->', err)
//         response.success = false
//         response.messages.push('Something went wrong! Please try again later')
//     }
//     res.send(response)
// }

var destroy = async function (req, res, next) {
    var response = {
        success: true,
        data: {},
        messages: []
    }

    try {
        var id = req?.user?.id

        var deleted = await models.UserInfo?.destroy({
            where: {
                userId: id
            }
        });

        if (deleted) {
            res.status(200)
            response.messages.push('UserInfo has been deleted')
        } else {
            res.status(404)
            response.success = false
            response.messages.push('Please try again')
        }
    } catch (err) {
        console.log('ERORR-->', err)
        response.success = false
        response.messages.push('Something went wrong! Please try again later')
    }
    res.send(response)
}

var update = async (req, res, next) => {
    console.log(req.body)
    var response = {
      success: true,
      messages: [],
      data: {}
    }
    // column names
    var nickname = req?.body?.nickname?.trim()
    var des = req?.body?.des?.trim()
  
    if (!nickname || nickname.length < 2) {
      response.success = false
      response.messages.push('The nickname should have more than 2 letters.')
    }
    if (!des || des.length < 5) {
      response.success = false
      response.messages.push('The description should have more than 5 letters.')
    }
  
    // if the response is false return
    if (!response.success) {
      res.send(response)
      return
    }
  
    // Check if the background image file is defined
    if (req.files?.bgPic) {
      // Update the background image in the database
      await models.UserInfo.update({
        bgPic: req.files.bgPic[0].filename
      }, {
        where: {
          userId: req.user.id
        }
      });
    }
  
    // Check if the avatar image file is defined
    if (req.files?.avatar) {
      // Update the avatar image in the database
      await models.UserInfo.update({
        avatar: req.files.avatar[0].filename
      }, {
        where: {
          userId: req.user.id
        }
      });
    }
  
    // Update the nickname and description fields in the database
    await models.UserInfo.update({
      nickname: nickname,
      des: des
    }, {
      where: {
        userId: req.user.id
      }
    });
  
    response.data = {
      nickname: nickname,
      des: des
    }
  
    res.status(200)
    res.send(response)
  }
  

var showUserInfo = async function (req, res, next) {
    var response = {
        success: true,
        data: {},
        messages: []
    }
    console.log("userId",req?.user?.id);
    try {
        var userInfo = await models.UserInfo?.findOne(
            {
                where:{
                    userId: req?.user?.id
                }
            },
            {
                attributes: { exclude: ['deletedAt', 'createdAt', 'updatedAt'] },
             })

        if(userInfo) {
            response.data = userInfoTransformer(userInfo)

        } else {
            res.status(404)
            response.success = false
            response.messages.push('Please Provide a valid ID.')
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
    // show,
    destroy,
    update,
    showUserInfo
}