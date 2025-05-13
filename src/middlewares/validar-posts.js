import Post from "./post.model.js";
import Course from "../courses/course.model.js";
import Category from "../categories/category.model.js";

export const validarCursoYCategoria = async (req, res, next) => {
    const { course, category } = req.body;

    try {
        const curso = await Course.findById(course);
        const categoria = await Category.findById(category);

        if (!curso || !categoria) {
            return res.status(400).json({
                success: false,
                message: "Curso o categoría inválida"
            });
        }

        next();
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error validando curso o categoría",
            error: error.message
        });
    }
};

export const validarExistenciaPost = async (req, res, next) => {
    const { id } = req.params;

    try {
        const post = await Post.findById(id);
        if (!post || !post.status) {
            return res.status(404).json({
                success: false,
                message: "Publicación no encontrada"
            });
        }

        req.post = post;
        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error validando publicación",
            error: error.message
        });
    }
};