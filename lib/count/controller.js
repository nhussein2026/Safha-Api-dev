const Connection = require("./db")

// const Connection = require("mysql2/typings/mysql/lib/Connection")

var countUsers = (req, res, next) => {
    Connection.query(`SELECT count(*) FROM users WHERE users.deletedAt is NULL`, (err, rows,fields) => {
        if(!err) {
            res.send(rows)
        } else {
            res.send(err)
        }
    })
}

modeule.export = {
    countUsers
}