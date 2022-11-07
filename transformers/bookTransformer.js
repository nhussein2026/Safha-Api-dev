var photoTransformer = require('./photoTransformer')

var booksTransformer = function(books) {
    return books.map(book => bookTransformer(book))
}
var bookTransformer = function(book){
    if (book?.dataValues?.cover) {
        book.dataValues.cover = photoTransformer(book.dataValues.cover)
    }
    return book
}

module.exports = {
    bookTransformer,
    booksTransformer
}