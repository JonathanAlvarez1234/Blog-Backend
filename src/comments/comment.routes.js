import { Router } from "express";
import { check } from "express-validator";
import { saveComment, getComments, searchComment, updateComment, deleteComment } from "./comment.controller.js";
import { validarPostExistente, validarComentarioExistente } from "../middlewares/validar-comments.js";
import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router();

router.post(
    "/",
    [
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