var bcrypt = require('bcryptjs')
var models = require("../../models")
var authService = require('../../services/authService');
const { Op } = require("sequelize");
const { token } = require('morgan');
var transformers = require ('../../transformers')

// var {userTransformer, usersTransformer} = require('../transformers/memberTransformer')

var SignUp = async function (req, res, next) {
   
        var response = {
            success: true,
            messages: [],
            data: {}
        }
        //this is for email validation
        function validateEmail(email) {
            const res = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return res.test(String(email).toLowerCase());
          }
          //this is for password validation
          function checkPassword(password) {

            var numbers = password.match(/\d+/g);
            var uppers  = password.match(/[A-Z]/);
            var lowers  = password.match(/[a-z]/);
            var special = password.match(/[!@#$%\^&*\+]/);
        
            if (numbers === null || uppers === null || lowers === null || special === null)
                result = false;
        
            if (numbers !== null && uppers !== null && lowers !== null && special !== null)
                result = true;
        
            return result;
        }
        var username = req?.body?.username.trim()
        var email = req?.body?.email.trim()
        var password = req?.body?.password.trim()
        var passwordConfirmation = req?.body?.passwordConfirmation.trim();
        
        console.log(req?.body)
          if(!validateEmail(email)){
            response.success = false
            response.messages.push('Email is not a VALID')
            return res.send(response)
          }
        if (username.length < 3) {
            response.success = false
            response.messages.push('Username is not a VALID!!, try again')
            return res.send(response)
        }
        // here will try to validate the password
        if (!checkPassword(password)){
            response.success = false
            response.messages.push('Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters')
            return res.send(response)
        }     
        if (passwordConfirmation.length < 7) {
            response.success = false
            response.messages.push('PasswordConfirmation is not TRUE')
            return res.send(response)
        }
        if (password != passwordConfirmation) {
            response.success = false
            response.messages.push('PasswordConfirmation is not same as password')
            return res.send(response)
        }
        const [user, isCreated] = await models?.User?.findOrCreate({
            where: {
                [Op.or]: [{ username }, { email }]
            },
            defaults: {
                username,
                email,
                password: authService.hashPassword(password),
                passwordConfirmation: authService.hashPassword(passwordConfirmation)
            }
        })
        if (isCreated) {
            response.success = true
            response.data = user
            response.messages.push("The account has been created successfully")
            return res.status(200).send(response)
        }else {
            response.success = false
            response.messages.push('You are already registered, Please go to login')
            return res.status(201).send(response)
        }
}
var index = async function (req, res, nex) {
    var response = {
        success: true,
        data: {},
        messages: []
    }
    var AllUsers = await await models?.User?.findAll({
        include: [
            { model: models.UserType }
        ]
    })
    if (Array.isArray(AllUsers)) {
        response.data = AllUsers
        res.send(response)
    } else {
        res.status(404)
        res.success = false
        response.messages.push('Please Try again later')
    }
}

var show = async function (req, res, next) {
    var response = {
        success: true,
        data: {},
        messages: []
    }
    var id = Number(req.params.id)
    var user = await models?.User.findByPk(id, {
        include: [
            { model: models?.UserType },
            { model: models?.UserInfo },
            { model: models?.Review },
            { model: models?.Book }
        ]
    })
    if (user) {
        // response.data = user
        response.data= transformers.userTransformer(user)
    } else {
        res.status(404)
        response.success = false
        response.messages.push('Please Provide a valid ID')
    }
    res.send(response)
}

var destroy = async function (req, res, nex) {
    var response = {
        success: true,
        data: {},
        messages: []
    }
    var username = req?.body?.username?.trim() 
    //this will enable the user to login by username or email
    var id = Number(req?.params?.id)
    var password = req?.body?.password?.trim()
    try {
        var user = await models.User.findOne({
            where: {
                id: id
            },
        })
        if (user) {
            if (authService.comparePassword(password, user.password)) {
                var deleted = await models.User.destroy({
                    where: {
                        id: id,
                        username: username,
                    }
                });
                response.data = deleted
                if (deleted) {
                    response.messages.push("Your account has been deleted successfully.")
                    res.status(200)
                } else {
                    response.success = false
                    response.messages.push('Please try again later.')
                }
            } else {
            response.messages.push('Wrong username or password!')
            response.success = false
            }
        }else{
            rsponse.success = false
            response.messages.push('This user is not valid!')
        }
    } catch (err) {
        console.log("Error->", err)
        response.success = false
        response.messages.push('Something went wrong!')
        res.status(500)
    }
    
    res.send(response)
}

var update = async function (req, res, next) {

    var response = {
        success: true,
        messages: [],
        data: {}
    }
    function validateEmail(email) {
        const res = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return res.test(String(email).toLowerCase());
      }
      //this is for password validation
      function checkPassword(password) {

        var numbers = password.match(/\d+/g);
        var uppers  = password.match(/[A-Z]/);
        var lowers  = password.match(/[a-z]/);
        var special = password.match(/[!@#$%\^&*\+]/);
    
        if (numbers === null || uppers === null || lowers === null || special === null)
            result = false;
    
        if (numbers !== null && uppers !== null && lowers !== null && special !== null)
            result = true;
    
        return result;
    }

    // column names
    var username = req?.body?.username.trim()
    var email = req?.body?.email.trim()
    var password = req?.body?.password.trim()

    //  Check the input values
    if (!username || username?.length < 3) {
        response.success = false
        response.messages.push('The username name should have more than 2 letters.')
    }
    if(!validateEmail(email)){
        response.success = false
        response.messages.push('Email is not a VALID')
        return res.send(response)
    }
    if (!checkPassword(password)){
        response.success = false
        response.messages.push('Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters')
        return res.send(response)
    } 
    if (!email || email?.length < 5) {
        response.success = false
        response.messages.push('The email should have more than 5 letters.')
    }

    // if the response is false return
    if (!response.success) {
        res.send(response)
        return
    }

    var id = Number(req?.params?.id)
    var email = req?.body?.email.trim()
    var password = req?.body?.password.trim()
    var username = req?.body?.username.trim()
    var updateUser = await models.User.update({
        email: email,
        username: username,
        password: authService.hashPassword(password),
    }, {
        where: {
            id
        }
    })
    //  result.data = memberTransformer(updateUser)
    response.data = updateUser
    if (updateUser) {
        response.success = true
        response.messages.push('Your account has been Updated successfully')
        return res.status(200).send(response)
    }else {
        response.success = false
        response.messages.push('Error, Please try again')
        return res.status(201).send(response)
    }
}

var login = async function (req, res, next) {
    try {
        var response = {
            success: true,
            messages: [],
            data: {},
            token: null
        }
        var account = req?.body?.account?.trim() //this will enable the user to login by username or email
        var password = req?.body?.password?.trim()
        var user = await models.User.findOne({
            where: {
                [Op.and]: [
                    { [Op.or]: [{ email: account }, { username: account }] }
                ]
            },
        })
        if (user) {
            if (authService.comparePassword(password, user.password)) {
                const token = authService.generateToken(user)
                if (token) {
                    response.success = true
                    response.token = token
                    response.messages.push('You Loged in')
                    return res.status(200).send(response)
                } else {
                    response.success = false
                    response.messages.push('Please try again')
                    return res.status(201).send(response)
                }
            }
        }
        console.log(token)
        response.success = false
        response.messages.push('Wrong email or password')
        return res.status(201).send(response)
    } catch (err) {
        console.log("Error->", err)
        response.success = false
        response.messages.push('server error')
        return res.status(500).send(response)
    }
}

module.exports = {
    SignUp,
    index,
    show,
    destroy,
    update,
    login
}