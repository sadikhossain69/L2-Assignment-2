import express from "express"
import {
    addOrders,
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
router.put('/:userId/orders', addOrders)

export const UserRoutes = router