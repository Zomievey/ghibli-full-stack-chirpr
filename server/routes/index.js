import * as express from "express";
const router = express.Router();
import chirpsRouter from "./chirps";
import usersRouter from "./users";

// localhost:3000/api/chirps/
router.use("/chirps", chirpsRouter);
router.use("/users", usersRouter);

export default router;