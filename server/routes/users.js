import * as express from "express";
import db from '../db';
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const body = req.body;

        const dbRes = await db.users.insert(body.name, body.email, body.password);
        res.status(200).json(dbRes);
    } catch (error) {
        console.error(error);
    }
});

export default router;