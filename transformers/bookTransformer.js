
var booksTransformer = function(books) {
    return books.map(book => bookTransformer(book))
}

var bookTransformer = function(book){
    if (book?.dataValues?.cover) {
        book.dataValues.cover = photoTransformer(book.dataValues.cover)
    }
    return book
}

var photoTransformer = function(photo) {
    photo = process.env.API_URL + '/uploads/' + photo
    return photo
}

module.exports = {
    photoTransformer,
    bookTransformer,
    booksTransformer
}