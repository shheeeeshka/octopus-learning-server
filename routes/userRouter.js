import { Router } from "express";

import userController from "../controllers/userController.js";

const router = new Router();

router.get("/get-users", userController.getUsers);
router.get("/find-user/:email", userController.findUser);

export default router;