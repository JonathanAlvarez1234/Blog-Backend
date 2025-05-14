import { Router } from "express";
import { validarCampos } from "../middlewares/validar-campos.js";
import { saveCourse, getCourses } from "./course.controller.js";

const router = Router();

router.get("/", getCourses)

router.post(
    "/addCourse/",
    [
        validarCampos
    ],
    saveCourse
)

export default router;