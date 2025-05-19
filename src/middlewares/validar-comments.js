import Post from "../posts/post.model.js";

export const validarPostExistente = async (req, res, next) => {
    const { postId } = req.body;

    if (!postId) {
        return res.status(400).json({
            success: false,
            message: "El ID del post es obligatorio"
        });
    }

    try {
        const post = await Post.findById(postId);
        if (!post || !post.status) {
            return res.status(404).json({
                success: false,
                message: "Post no encontrado"
            });
        }

        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error al validar el post",
            error: error.message
        });
    }
};