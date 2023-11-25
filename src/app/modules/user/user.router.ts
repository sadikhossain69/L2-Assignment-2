import express from "express"
import {
    createUsers,
    deleteSingleUser,
    getUsersController,
    updateAUser,
    userByIdController
} from "./user.controller"

const router = express.Router()

router.post('/', createUsers)
router.get('/', getUsersController)
router.get('/:userId', userByIdController)
router.put('/:userId', updateAUser)
router.delete('/:userId', deleteSingleUser)

export const UserRoutes = router