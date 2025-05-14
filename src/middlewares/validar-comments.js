import Comment from "../comments/comment.model.js";
import Post from "../posts/post.model.js";

export const validarPostExistente = async (req, res, next) => {
    const { title } = req.body;

    try {
        const post = await Post.findOne({title});
        if (!post) {
            return res.status(400).json({
                success: false,
                message: "Invalid post"
            });
        }

        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error validating the publication",
            error: error.message
        });
    }
};

export const validarComentarioExistente = async (req, res, next) => {
    const { id } = req.params;

    try {
        const comment = await Comment.findById(id);
        if (!comment || !comment.status) {
            return res.status(404).json({
                success: false,
                message: "Comment not found"
            });
        }

        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error searching for comment",
            error: error.message
        });
    }
};