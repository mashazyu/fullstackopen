const dummy = (blogs) => {
    return 1
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return {}

    let favorite = {...blogs[0]}

    blogs.forEach(blog => {
        if (blog.likes > favorite.likes) {
            favorite = {...blog}
        }
    })

    return {
        title: favorite.title,
        author: favorite.author,
        likes: favorite.likes
    }
}

const totalLikes = (blogs) => {
    return blogs.reduce((acc, val) => acc + val.likes, 0)
}
  
module.exports = {
    dummy,
    favoriteBlog,
    totalLikes
}