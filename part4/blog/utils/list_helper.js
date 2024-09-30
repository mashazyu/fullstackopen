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

const groupedBlogs = (blogs) => blogs.reduce((acc, curr) => {
    const groupKey = curr["author"];

    if (!acc[groupKey]) {
        acc[groupKey] = [];
    }

    acc[groupKey].push(curr);

    return acc;
}, {})

const mostBlogs = (blogs) => {
    if (blogs.length === 0) return {}

    const grouped = groupedBlogs(blogs)
    const authorsWithBlogCount = Object.keys(grouped)
        .map(key => ({ "author": key, "blogs": grouped[key].length })) 
    
    return authorsWithBlogCount.reduce((prev, curr) => {
        return (prev.blogs > curr.blogs) ? prev : curr
    })
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) return {}

    const grouped = groupedBlogs(blogs)
    const authorsWithLikesCount = Object.keys(grouped)
        .map(key => {
            const likes = grouped[key].reduce((acc, curr) => (acc + curr.likes), 0)

            return ({ "author": key, likes })
        }) 
    
    return authorsWithLikesCount.reduce((prev, curr) => {
        return (prev.likes > curr.likes) ? prev : curr
    })
}

const totalLikes = (blogs) => {
    return blogs.reduce((acc, val) => acc + val.likes, 0)
}
  
module.exports = {
    dummy,
    favoriteBlog,
    mostBlogs,
    mostLikes,
    totalLikes
}