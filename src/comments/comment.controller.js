import Comment from "../comments/comment.model.js";

export const saveComment = async (req, res) => {
    try {
        const { visitorName, content, postId } = req.body;

        const newComment = new Comment({ visitorName, content, postId });
        await newComment.save();

        res.status(200).json({
            success: true,
            message: "Comentario guardado",
            comment: newComment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al guardar el comentario",
            error: error.message
        });
    }
};

export const getComments = async (req, res) => {
    try {
        const { limite = 10, desde = 0 } = req.query;

        const [comments, total] = await Promise.all([
            Comment.find({ status: true })
                .populate("postId", "title")
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
            message: "Error al obtener comentarios",
            error: error.message
        });
    }
};

export const searchComment = async (req, res) => {
    try {
        const { id } = req.params;

        const comment = await Comment.findById(id).populate("postId", "title");

        res.status(200).json({
            success: true,
            comment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al buscar el comentario",
            error: error.message
        });
    }
};

export const updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { content, visitorName } = req.body;

        const updateFields = {};
        if (content !== undefined) updateFields.content = content;
        if (visitorName !== undefined) updateFields.visitorName = visitorName;

        const updated = await Comment.findByIdAndUpdate(
            id,
            updateFields,
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({
                success: false,
                message: "Comentario no encontrado"
            });
        }

        res.status(200).json({
            success: true,
            message: "Comentario actualizado",
            comment: updated
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al actualizar el comentario",
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
            message: "Comentario eliminado correctamente"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al eliminar el comentario",
            error: error.message
        });
    }
};

export const getCommentsByPost = async (req, res) => {
    try {
        const { postId } = req.params;

        const comments = await Comment.find({ postId, status: true }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            total: comments.length,
            comments
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al obtener comentarios del post",
            error: error.message
        });
    }
};