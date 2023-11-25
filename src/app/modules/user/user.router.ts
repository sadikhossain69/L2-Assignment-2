import express from "express"
import { createUsers, getUsersController, updateAUser, userByIdController } from "./user.controller"

const router = express.Router()

router.post('/', createUsers)
router.get('/', getUsersController)
router.get('/:userId', userByIdController)
router.put('/:userId', updateAUser)

export const UserRoutes = router