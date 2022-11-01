const userTransformer = (user) => {
    const transformeredUser = {
        name: '',
        nickname:'',
        email:'',
        avatar:'',
        bgPic:'',
        type:'', 
        reviews: [],
        // book:[]
    }
    if (user) {
        transformeredUser.name = user?.username
        transformeredUser.email = user?.email
        transformeredUser.avatar = user?.UserInfo?.avatar
        transformeredUser.bgPic = user?.UserInfo?.bgPic
        transformeredUser.nickname = user?.UserInfo?.nickname
        transformeredUser.type = user?.UserType?.type
        user?.Reviews?.map(review =>{
            transformeredUser.reviews.push(review.content)
        })
        return transformeredUser
    }
    return user
}

const userInfoTransformer = (userInfo) => {
    console.log(userInfo)
    if(userInfo){
        delete userInfo['dataValues']['id']
        delete userInfo['dataValues']['usersId']
        delete userInfo['dataValues']['updatedAt']
        delete userInfo['dataValues']['createdAt']
        if(userInfo['dataValues']['usersId'])
        delete userInfo['dataValues']['usersId']
    }
    return userInfo
}

const userTypeTransformer = (userType) => {
    console.log(userType)
    if(userType){
        delete userType['dataValues']['id']
        delete userType['dataValues']['updatedAt']
        delete userType['dataValues']['createdAt']
        if(userType['dataValues']['usersId'])
        delete userType['dataValues']['usersId']
    }
    return userType
}

const reviewsTransformer = (reviews) => {
    console.log(reviews)
    const transformeredReviews = {
        content: '',
        User: {name: '', email:''}
    }
    if (reviews) {
        transformeredReviews.content = reviews?.content
        transformeredReviews.User.name = reviews?.User?.username
        transformeredReviews.User.email = reviews?.User?.email

        return transformeredReviews
    }
   
    return reviews
}

module.exports = {
    userTransformer,
    userInfoTransformer,
    userTypeTransformer,
    reviewsTransformer
}