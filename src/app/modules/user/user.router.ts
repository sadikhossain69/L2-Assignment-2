import express from "express"
import { createUsers } from "./user.controller"

const router = express.Router()

router.post('/', createUsers)

export const UserRoutes = router