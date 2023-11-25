"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router.post('/', user_controller_1.createUsers);
router.get('/', user_controller_1.getUsersController);
router.get('/:userId', user_controller_1.userByIdController);
router.put('/:userId', user_controller_1.updateAUser);
router.delete('/:userId', user_controller_1.deleteSingleUser);
router.put('/:userId/orders', user_controller_1.addOrders);
router.get('/:userId/orders', user_controller_1.getOrdersOfUsers);
router.get('/:userId/orders/total-price', user_controller_1.calculatePrice);
exports.UserRoutes = router;
