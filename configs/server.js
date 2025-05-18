'use strict'

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { dbConnection } from "./mongo.js";
import limiter from '../src/middlewares/validar-cant-peticiones.js'
import postRoutes from "../src/posts/post.routes.js";
import commentRoutes from "../src/comments/comment.routes.js";
import courseRoutes from "../src/courses/course.routes.js"

const middlewares = (app) => {
    app.use(express.urlencoded({ extended: false }));
    app.use(cors());
    app.use(express.json());
    app.use(helmet());
    app.use(morgan('dev'));
    app.use(limiter);
}

const routes = (app) => {
    app.use("/blogSystem/posts", postRoutes);
    app.use("/blogSystem/comments", commentRoutes);
    app.use("/blogSystem/courses", courseRoutes);
}

const conectarDB = async () => {
    try {
        await dbConnection();
        console.log("Connection to the database successful");
    } catch (error) {
        console.error('Error connecting to the database', error);
        process.exit();
    }
}

export const initServer = async () => {
    const app = express();
    const port = process.env.PORT || 3001;

    try {
        middlewares(app);
        await conectarDB();
        routes(app);
        app.listen(port);
        console.log(`Server running on port: ${port}`);
    } catch (err) {
        console.log(`Server init failed: ${err}`);
    }
}