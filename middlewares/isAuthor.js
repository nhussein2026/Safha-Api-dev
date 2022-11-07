const isAuthor = function(req, res, next) {
    if (req.user) {
        if (req.user.type == 'author' || "admin") {
            return next()
        }
    }
    res.status(403)
    res.send({
        success: false,
        messages: ['Youuu do not have permission to perform this action']
    })
}

module.exports = isAuthor