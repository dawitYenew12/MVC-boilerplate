import Blog from './../models/blog.model.js';

const addComment = async (blogId, comments) => {
  const blog = await Blog.findOneAndUpdate(
    { _id: blogId },
    { $push: { comments } },
    { new: true },
  );
  return blog;
};

export default { addComment };
