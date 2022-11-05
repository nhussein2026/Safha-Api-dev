var photoTransformer = function(photo) {
    // photo.file = 'http://localhost:3000/uploads/' + photo.file
    photo.file = process.env.REACT_APP_API_URL + '/uploads/' + photo.file
    return photo
}
var photosTransformer = function(photos) {
    return photos.map(photo => photoTransformer(photo))
}

module.exports = {
    photoTransformer,
    photosTransformer
}