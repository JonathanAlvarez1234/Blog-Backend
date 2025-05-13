import { Router } from "express";
import { check } from "express-validator";
import { savePost, getPosts, getPostById, deletePost, updatePost } from "./post.controller.js";
import { validarCursoYCategoria, validarExistenciaPost } from "../middlewares/validar-posts.js";
import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router();

router.post(
    "/",
    [
        check("title", "The title is required").not().isEmpty(),
        check("course", "Course is required").not().isEmpty(),
        check("category", "The category is required").not().isEmpty(),
        check("content", "Content is required").not().isEmpty(),
        validarCursoYCategoria,
        validarCampos
    ],
    savePost
)

router.get("/", getPosts)

router.get(
    "find/:id",
    [
        check("id", "Not a valid ID").isMongoId(),
        validarExistenciaPost,
        validarCampos
    ],
    getPostById
)

router.put(
    "/:id",
    [
        check("id", "Not a valid ID").isMongoId(),
        validarExistenciaPost,
        validarCampos
    ],
    updatePost
)

router.delete(
    "/:id",
    [
        check("id", "Not a valid ID").isMongoId(),
        validarExistenciaPost,
        validarCampos
    ],
    deletePost
)

export default router;