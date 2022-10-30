var models = require('../../models')

var store = async (req, res, next) => {
    
    var response = {
        success: true,
        messages: [],
        data: {}
    }

    // column names
    var categoryId = Number(req?.body?.categoryId)
    var bookId = Number(req?.body?.bookId)

    //  Check the input values
    if(!categoryId || categoryId < 1){
        response.success = false
        response.messages.push('This field should be a number.')
    }
    if(!bookId || bookId < 1){
        response.success = false
        response.messages.push('This field should be a number.')
    }
    // if the response is false return
    if (!response.success) {
        res.send(response)
        return
    }
    try {
        // store a new item
        var newBookType = await models?.BookType?.create({
            categoryId: categoryId,
            bookId: bookId,
        })
        response.data = newBookType
        response.messages.push('A new book has been added successfully.')
    } catch (err) {
        console.log("Error -->", err)
        response.messages.push('Something went wrong! Please try again later')
        response.success = false
        // res.send(response)
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
        var bookTypes = await models?.BookType?.findAll()

        if (Array?.isArray(bookTypes)) {
            response.data = bookTypes
        } else {
            res.status(404)
            res.success = false
            response.messages.push('Please try again later')
        }
    } catch (err) {
        console.log("Error -->", err)
        response.messages.push('Something went wrong! Please try again later')
        response.success = false
        res.send(response)
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
        var bookType = await models?.BookType?.findByPk(req?.params?.id)

        if(bookType) {
            response.data = bookType
        } else {
            response.success = false
            response.messages.push('Please Provide a Valid ID')
            res.status(404)
        }
    } catch (err) {
        console.log("Error -->", err)
        response.messages.push('Something went wrong! Please try again later')
        response.success = false
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

    var deleted = await models?.BookType?.destroy({
        where: {
            id: id
        }
    });

    if (deleted) {
        res.status(200)
        response.messages.push('Item has been removerd from bookType list')
    } else {
        res.status(404)
        response.success = false
        response.messages.push('Please try again')
    }
    res.send(response)
}


module.exports = {
    store,
    index,
    show,
    destroy
}