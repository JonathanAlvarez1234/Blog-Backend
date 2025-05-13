import Comment from "../comments/comment.model.js";
import Post from "../posts/post.model.js";

export const validarPostExistente = async (req, res, next) => {
    const { whichPost } = req.body;

    try {
        const post = await Post.findById(whichPost);
        if (!post || !post.status) {
            return res.status(400).json({
                success: false,
                message: "Publicación no válida"
            });
        }

        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error al validar la publicación",
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
                message: "Comentario no encontrado"
            });
        }

        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error al buscar el comentario",
            error: error.message
        });
    }
};