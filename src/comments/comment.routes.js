import { Router } from "express";
import { check } from "express-validator";
import { saveComment, getComments, searchComment, updateComment, deleteComment } from "./comment.controller.js";
import { validarPostExistente, validarComentarioExistente } from "../middlewares/validar-comments.js";
import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router();

router.post(
    "/",
    [
        check("postId", "The ID for the publication is required").isMongoId(),
        check("content", "Content is required").not().isEmpty(),
        validarPostExistente,
        validarCampos
    ],
    saveComment
)

router.get("/", getComments)

router.get(
    "/find/:id",
    [
        check("id", "Not a valid ID").isMongoId(),
        validarComentarioExistente,
        validarCampos
    ],
    searchComment
)

router.put(
    "/:id",
    [
        check("id", "Not a valid ID").isMongoId(),
        validarComentarioExistente,
        validarCampos
    ],
    updateComment
)


router.delete(
    "/:id",
    [
        check("id", "Not a valid ID").isMongoId(),
        validarComentarioExistente,
        validarCampos
    ],
    deleteComment
)

export default router;