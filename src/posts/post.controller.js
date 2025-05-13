import Post from "./post.model.js";

export const savePost = async (req, res) => {
    try {
        const { title, content, course, category, description } = req.body;

        const newPost = new Post({ title, content, course, category, description });
        await newPost.save();

        res.status(201).json({
            success: true,
            message: "Post created",
            post: newPost
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error saving post",
            error: error.message
        });
    }
};

export const getPosts = async (req, res) => {
    try {
        const { desde = 0, limite = 10 } = req.query;

        const [posts, total] = await Promise.all([
            Post.find({ status: true })
                .populate("course", "name")
                .populate("category", "name")
                .skip(Number(desde))
                .limit(Number(limite)),
            Post.countDocuments({ status: true })
        ]);

        res.status(200).json({ success: true, total, posts });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error getting posts",
            error: error.message
        });
    }
};

export const getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id)
            .populate("course", "name")
            .populate("category", "name");

        if (!post || !post.status) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        res.status(200).json({ success: true, post });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error searching for the post",
            error: error.message
        });
    }
};

export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);
        if (!post || !post.status) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        post.status = false;
        await post.save();

        res.status(200).json({ success: true, message: "Deleted post" });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting post",
            error: error.message
        });
    }
};

export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { course, category, ...data } = req.body;

        const post = await Post.findById(id);
        if (!post || !post.status) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        if (course) post.course = course;
        if (category) post.category = category;
        Object.assign(post, data);

        await post.save();

        res.status(200).json({
            success: true,
            message: "Post updated",
            post
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating post",
            error: error.message
        });
    }
};