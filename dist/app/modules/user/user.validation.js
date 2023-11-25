"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = exports.userValidation = void 0;
const zod_1 = require("zod");
// Validation schema for full name
const fullNameValidation = zod_1.z.object({
    firstName: zod_1.z.string().min(1, { message: 'First name is required' }),
    lastName: zod_1.z.string().min(1, { message: 'Last name is required' }),
});
// Validation schema for address
const addressValidation = zod_1.z.object({
    street: zod_1.z.string().min(1, { message: 'Street is required' }),
    city: zod_1.z.string().min(1, { message: 'City is required' }),
    country: zod_1.z.string().min(1, { message: 'Country is required' }),
});
// Validation schema for order
const orderValidation = zod_1.z.object({
    productName: zod_1.z.string().min(1, { message: 'Product must be a string' }),
    price: zod_1.z.number().min(0, { message: 'Price must be greater than 0' }),
    quantity: zod_1.z.number().min(1, { message: 'Quantity must be greater than 0' }),
});
// Validation schema for user
exports.userValidation = zod_1.z.object({
    userId: zod_1.z.number().min(1, { message: 'User ID must be greater than 0' }),
    username: zod_1.z.string().min(1, { message: 'Username is required' }),
    password: zod_1.z.string().min(1, { message: 'Password is required' }),
    fullName: fullNameValidation,
    age: zod_1.z.number().min(1, { message: 'Age must be greater than 0' }),
    email: zod_1.z.string().email({ message: 'Invalid email' }),
    isActive: zod_1.z.boolean(),
    hobbies: zod_1.z.array(zod_1.z.string().min(1, { message: 'Hobby is required' })),
    address: addressValidation,
    orders: zod_1.z.array(orderValidation).optional(),
});
// Validation function for validating user data
function validateUser(data) {
    try {
        return exports.userValidation.parse(data);
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            // Handle validation errors, log them, or throw a custom error.
            throw new Error(`Validation failed: ${error.message}`);
        }
        throw error;
    }
}
exports.validateUser = validateUser;
