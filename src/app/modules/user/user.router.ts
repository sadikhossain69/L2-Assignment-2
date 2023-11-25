import express from "express"
import { createUsers, getUsersController, userByIdController } from "./user.controller"

const router = express.Router()

router.post('/', createUsers)
router.get('/', getUsersController)
router.get('/:userId', userByIdController)

export const UserRoutes = router