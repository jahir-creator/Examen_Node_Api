import {Router} from "express";
import { methods as blogController } from "./../controllers/blog.controllers";
const router = Router();

// router.get("/", (req, res) => {
    // res.send("PRUEBA DE RUTAS")
// });
router.get("/", blogController.getPosts);
router.get("/:id", blogController.getPost);
router.post("/", blogController.addPost);
router.get("/busqueda/:terminoBusqueda", blogController.getBusqueda);

export default router;