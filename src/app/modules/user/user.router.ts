import express from "express"
import {
    addOrders,
    calculatePrice,
    createUsers,
    deleteSingleUser,
    getOrdersOfUsers,
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
router.get('/:userId/orders', getOrdersOfUsers)
router.get('/:userId/orders/total-price', calculatePrice)


export const UserRoutes = router