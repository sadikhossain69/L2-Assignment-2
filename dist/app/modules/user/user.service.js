"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateTotalPrice = exports.getOrders = exports.addOrder = exports.deleteUser = exports.updateUser = exports.getUserById = exports.getAllUsers = exports.createUser = void 0;
const user_model_1 = require("./user.model");
/**
 * The function creates a new user using the provided user data and returns the created user.
 * @param {IUser} userData - The `userData` parameter is an object that contains the data needed to
 * create a new user. It should have the following properties:
 * @returns the newly created user object.
 */
function createUser(userData) {
    return __awaiter(this, void 0, void 0, function* () {
        // Create the user using the mongoose model if the user does not exist
        const newUser = yield user_model_1.User.create(userData);
        return newUser;
    });
}
exports.createUser = createUser;
/**
 * The function getAllUsers retrieves all users from a MongoDB database using the mongoose model.
 * @returns a promise that resolves to an array of IUser objects.
 */
function getAllUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        // Get all users using the mongoose model
        const users = yield user_model_1.User.find();
        return users;
    });
}
exports.getAllUsers = getAllUsers;
/**
 * The function `getUserById` retrieves a user by their ID, converts the ID to a number, checks if the
 * user exists, and returns the user if they exist.
 * @param {string} userId - The `userId` parameter is a string that represents the unique identifier of
 * a user.
 * @returns a Promise that resolves to either an IUser object or null.
 */
function getUserById(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        // Convert the userId to number
        const userIdNumber = Number(userId);
        // Check if the user exists with static method
        const existingUser = yield user_model_1.User.isUserExist(userIdNumber);
        if (!existingUser) {
            throw new Error('User does not exist!');
        }
        else {
            const user = yield user_model_1.User.findOne({ userId: userId }).select('-orders');
            return user;
        }
    });
}
exports.getUserById = getUserById;
/**
 * The updateUser function updates a user's data if the user exists, otherwise it throws an error.
 * @param {string} userId - The userId parameter is a string that represents the unique identifier of
 * the user.
 * @param {IUser} userData - The `userData` parameter is an object that represents the updated user
 * data. It should have properties that match the fields of the `IUser` interface.
 * @returns a Promise that resolves to either an IUser object or null.
 */
function updateUser(userId, userData) {
    return __awaiter(this, void 0, void 0, function* () {
        // Convert the userId to number
        const userIdNumber = Number(userId);
        // Check if the user exists with static method
        const existingUser = yield user_model_1.User.isUserExist(userIdNumber);
        if (!existingUser) {
            throw new Error('User does not exist!');
        }
        else {
            const updatedUser = yield user_model_1.User.findOneAndUpdate({ userId: userId }, userData, { new: true });
            return updatedUser;
        }
    });
}
exports.updateUser = updateUser;
/**
 * The deleteUser function deletes a user with the specified userId and returns the deleted user if it
 * exists.
 * @param {string} userId - The `userId` parameter is a string that represents the unique identifier
 * of the user to be deleted.
 * @returns a Promise that resolves to either an IUser object or null.
 */
function deleteUser(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        // Convert the userId to number
        const userIdNumber = Number(userId);
        // Check if the user exists with static method
        const existingUser = yield user_model_1.User.isUserExist(userIdNumber);
        if (!existingUser) {
            throw new Error('User does not exist!');
        }
        else {
            const deletedUser = yield user_model_1.User.findOneAndDelete({ userId: userId });
            return deletedUser;
        }
    });
}
exports.deleteUser = deleteUser;
/**
 * The addOrder function adds an order to a user's list of orders if the user exists.
 * @param {string} userId - The userId parameter is a string that represents the unique identifier of a
 * user. It is used to identify the user for whom the order is being added.
 * @param {TOrders} orderData - The `orderData` parameter is of type `TOrders`, which represents the
 * data for the order. It could be an object with properties such as `orderId`, `orderDate`,
 * `orderItems`, etc. The specific structure of `TOrders` would depend on the requirements of your
 * application.
 * @returns a Promise that resolves to either an IUser object or null.
 */
function addOrder(userId, orderData) {
    return __awaiter(this, void 0, void 0, function* () {
        // Convert the userId to number
        const userIdNumber = Number(userId);
        // Check if the user exists with static method
        const existingUser = yield user_model_1.User.isUserExist(userIdNumber);
        if (!existingUser) {
            throw new Error('User does not exist!');
        }
        else {
            const updatedUser = yield user_model_1.User.findOneAndUpdate({ userId: userId }, { $push: { orders: orderData } }, { new: true });
            return updatedUser;
        }
    });
}
exports.addOrder = addOrder;
/**
 * The function `getOrders` retrieves the orders for a given user ID, after checking if the user
 * exists.
 * @param {string} userId - The `userId` parameter is a string that represents the unique identifier of
 * a user.
 * @returns a Promise that resolves to an array of TOrders objects or null.
 */
function getOrders(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        // Convert the userId to number
        const userIdNumber = Number(userId);
        // Check if the user exists with static method
        const existingUser = yield user_model_1.User.isUserExist(userIdNumber);
        if (!existingUser) {
            throw new Error('User does not exist!');
        }
        else {
            const user = yield user_model_1.User.findOne({ userId: userId });
            return (user === null || user === void 0 ? void 0 : user.orders) || null;
        }
    });
}
exports.getOrders = getOrders;
function calculateTotalPrice(userId) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        // Convert the userId to number
        const userIdNumber = Number(userId);
        // Check if the user exists with static method
        const existingUser = yield user_model_1.User.isUserExist(userIdNumber);
        if (!existingUser) {
            throw new Error('User does not exist!');
        }
        else {
            const user = yield user_model_1.User.findOne({ userId: userId });
            const totalPrice = (_a = user === null || user === void 0 ? void 0 : user.orders) === null || _a === void 0 ? void 0 : _a.reduce((acc, order) => {
                return acc + order.price * order.quantity;
            }, 0);
            return totalPrice || 0;
        }
    });
}
exports.calculateTotalPrice = calculateTotalPrice;
