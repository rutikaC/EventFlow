import express from "express"
import { auth} from "../middlewares/auth.middleware.js"
import { authrole } from "../middlewares/authrole.middleware.js";
import { 
    deleteCategory,
    getAllCategory,
    getCategoryByName,
    registerCategory,
    updateCategory
} from "../controllers/category.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";


export const categoryRoutes = express.Router();

categoryRoutes.post("/register",auth, authrole, upload.single('image') ,registerCategory);
categoryRoutes.put("/update/:categoryId", auth, authrole, upload.single("image"), updateCategory);
categoryRoutes.delete("/delete/:categoryId", auth, authrole, deleteCategory);
categoryRoutes.get("/fetch", auth, getAllCategory);
categoryRoutes.get("/fetch/events/:categoryname", auth, getCategoryByName);