import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import { 
    getComentariosPredefinidos, 
    getListComentariosPredefinidos, 
    insertComentarioPredefinido,
    deleteComentarioPredefinido,
    updateComentarioPredefinido,
    getMaxCodeListComentariosPredefinidos
} from "../controllers/comentarios.controller";

router.get("/getComentariosPredefinidos", TokenValidation, getComentariosPredefinidos);

// MÓDULO COMENTARIOS PREDEFINIDOS
router.get("/listarComentariosPredefinidos", TokenValidation, getListComentariosPredefinidos);
router.get("/consultarMaxCodeComentariosPredefinidos", TokenValidation, getMaxCodeListComentariosPredefinidos);
router.post("/insertarComentarioPredefinido", TokenValidation, insertComentarioPredefinido);
router.post("/eliminarComentarioPredefinido", TokenValidation, deleteComentarioPredefinido);
router.put("/actualizarComentarioPredefinido", TokenValidation, updateComentarioPredefinido);



export default router;
