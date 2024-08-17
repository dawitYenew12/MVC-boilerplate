import Blog from './../models/blog.model.js';

const createBlog = async (req, res) => {
    try {
        const blogData = req.body
        await Blog.create(blogData);
        res.send({ success: true, message: 'Blog created successfully' });
    } catch (error) {
        res.end({ error: true,  message: error.message });
    }
}

const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({});
        res.json(blogs);
    } catch (error) {
        res.end({ error: true,  message: error.message });
    }
}

export {
    getBlogs,
    createBlog,
}