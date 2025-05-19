import { Router } from "express";
import { check } from "express-validator";
import { saveComment, getComments, searchComment, updateComment, deleteComment, getCommentsByPost } from "./comment.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarPostExistente } from "../middlewares/validar-comments.js";

const router = Router();

router.post(
    "/",
    [
        check("postId", "The ID of the post is required ").isMongoId(),
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
        validarCampos
    ],
    searchComment
)

router.put(
    "/:id",
    [
        check("id", "Not a valid ID").isMongoId(),
        validarCampos
    ],
    updateComment
)


router.delete(
    "/:id",
    [
        check("id", "Not a valid ID").isMongoId(),
        validarCampos
    ],
    deleteComment
)

router.get("/post/:postId", getCommentsByPost);


export default router;