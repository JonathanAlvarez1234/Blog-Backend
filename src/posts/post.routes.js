import { Router } from "express";
import { check } from "express-validator";
import { savePost, getPosts, getPostById, deletePost, updatePost } from "./post.controller.js";
import { validarCurso, validarExistenciaPost } from "../middlewares/validar-posts.js";
import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router();

router.post(
    "/",
    [
        validarCurso,
        validarCampos
    ],
    savePost
)

router.get("/", getPosts)

router.get(
    "/find/:id",
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