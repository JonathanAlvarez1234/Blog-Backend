import Comment from "../comments/comment.model.js";
import Post from "../posts/post.model.js";

export const saveComment = async (req, res) => {
    try {
        const { visitorName, content, title } = req.body;

        const post = await Post.findOne({title})

        const newComment = new Comment({ visitorName, content, whichPost: post._id });
        await newComment.save();

        await Post.findByIdAndUpdate(post._id, {
            $push: {
                comments: newComment._id
            }
        })

        res.status(200).json({
            success: true,
            message: "Comment save",
            comment: newComment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error saving comment",
            error: error.message
        });
    }
};

export const getComments = async (req, res) => {
    try {
        const { limite = 10, desde = 0 } = req.query;

        const [comments, total] = await Promise.all([
            Comment.find({ status: true })
                .populate("whichPost", "title")
                .skip(Number(desde))
                .limit(Number(limite)),
            Comment.countDocuments({ status: true })
        ]);

        res.status(200).json({
            success: true,
            total,
            comments
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error getting comments",
            error: error.message
        });
    }
};

export const searchComment = async (req, res) => {
    try {
        const { id } = req.params;

        const comment = await Comment.findById(id).populate("whichPost", "title");

        res.status(200).json({
            success: true,
            comment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error searching for comment",
            error: error.message
        });
    }
};

export const updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;

        const updated = await Comment.findByIdAndUpdate(
            id,
            { content },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Updated comment",
            comment: updated
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating comment",
            error: error.message
        });
    }
};

export const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;

        await Comment.findByIdAndUpdate(id, { status: false });

        res.status(200).json({
            success: true,
            message: "Comment successfully deleted"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting comment",
            error: error.message
        });
    }
};