var bookTransformer = function(book){
    console.log("inside book transformer")
    if (book?.dataValues?.cover) {
        book.dataValues.cover = photoTransformer(book.dataValues.cover)
    }
    return book
}

var photoTransformer = function(photo) {
    console.log("process.env.REACT_APP_API_URL",process.env.REACT_APP_API_URL)
    // photo.file = 'http://localhost:3000/uploads/' + photo.file
    // photo = `${process.env.REACT_APP_API_URL}/uploads/` + photo
    // var ghadirPath = "http://192.168.122.5:3000/api/v1"
    var SafhaPath = "http://localhost:3000/api/v1"
    photo = `${SafhaPath}/uploads/` + photo
    return photo
}
// var photosTransformer = function(photos) {
//     return photos.map(photo => photoTransformer(photo))
// }

module.exports = {
    photoTransformer,
    bookTransformer
    // photosTransformer
}