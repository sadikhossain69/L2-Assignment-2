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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
/*
The code `const userFullNameSchema: Schema<TFullName> = new Schema({ ... })` is defining a Mongoose
schema for the `TFullName` interface.
*/
const userFullNameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
});
/*
The code `const addressSchema: Schema<TAddress> = new Schema({ ... })` is defining a Mongoose schema
for the `TAddress` interface.
*/
const addressSchema = new mongoose_1.Schema({
    street: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
});
/*
The code `const userOrdersSchema: Schema<TOrders> = new Schema({ ... })` is defining a Mongoose
schema for the `TOrders` interface. This schema represents the structure of the `orders` field in
the `userSchema`.
*/
const userOrdersSchema = new mongoose_1.Schema({
    productName: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
});
/*
The code is defining a Mongoose schema for the `IUser` interface. This schema represents the
structure and validation rules for a user document in a MongoDB collection.
*/
const userSchema = new mongoose_1.Schema({
    userId: {
        type: Number,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    fullName: {
        type: userFullNameSchema,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true,
    },
    hobbies: {
        type: [String],
        required: true,
    },
    address: {
        type: addressSchema,
        required: true,
    },
    orders: {
        type: [userOrdersSchema],
    },
});
/*
The code `userSchema.pre<IUser>("save", async function(next) { ... })` is a pre-save middleware
function in Mongoose. It is executed before saving a user document to the database.
*/
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        // making password hash
        user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.bcrypt_salt_rounds));
        next();
    });
});
/*
The code `userSchema.post('save', async function (doc, next) { ... })` is a post-save middleware
function in Mongoose. It is executed after saving a user document to the database.
*/
userSchema.post('save', function (doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield exports.User.findOne(doc._id).select('-password -orders');
        if (user) {
            Object.assign(doc, user);
        }
        next();
    });
});
/*
The code `userSchema.post('find', async function (docs: IUser[], next) { ... })` is a post-find
middleware function in Mongoose. It is executed after a find operation is performed on the User
model.
*/
userSchema.post('find', function (docs, next) {
    return __awaiter(this, void 0, void 0, function* () {
        //   Making orders field empty
        docs.forEach((doc) => {
            doc.orders = undefined;
        });
        next();
    });
});
/*
The code `userSchema.post('findOneAndUpdate', async function (doc: IUser, next) { ... })` is a
post-findOneAndUpdate middleware function in Mongoose. It is executed after a findOneAndUpdate
operation is performed on the User model.
*/
userSchema.post('findOneAndUpdate', function (doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        //   Making orders field undefined
        doc.orders = undefined;
        next();
    });
});
// Custom static method for the user schema
userSchema.statics.isUserExist = function (userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield this.findOne({ userId: userId });
        return user;
    });
};
/* `export const User = model<IUser, UserModel>("User", userSchema)` is exporting a Mongoose model
named "User" based on the `userSchema` schema. */
exports.User = (0, mongoose_1.model)('User', userSchema);
