import express from "express"
import { createUsers, getUsersController } from "./user.controller"

const router = express.Router()

router.post('/', createUsers)
router.get('/', getUsersController)

export const UserRoutes = router