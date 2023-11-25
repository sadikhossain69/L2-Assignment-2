import { Schema, model } from "mongoose";
import { IUser, TAddress, TFullName, TOrders } from "./user.interface";
import bcrypt from "bcrypt"
import config from "../../config";

/* 
The code `const userFullNameSchema: Schema<TFullName> = new Schema({ ... })` is defining a Mongoose
schema for the `TFullName` interface. 
*/
const userFullNameSchema: Schema<TFullName> = new Schema({
    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },
})

/* 
The code `const addressSchema: Schema<TAddress> = new Schema({ ... })` is defining a Mongoose schema
for the `TAddress` interface. 
*/
const addressSchema: Schema<TAddress> = new Schema({
    street: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true
    },

    country: {
        type: String,
        required: true
    }
})

/* 
The code `const userOrdersSchema: Schema<TOrders> = new Schema({ ... })` is defining a Mongoose
schema for the `TOrders` interface. This schema represents the structure of the `orders` field in
the `userSchema`. 
*/
const userOrdersSchema: Schema<TOrders> = new Schema({
    productName: {
        type: String,
        required: true
    },
    
    price: {
        type: Number,
        required: true
    },

    quantity: {
        type: Number,
        required: true
    }
})

/* 
The code is defining a Mongoose schema for the `IUser` interface. This schema represents the
structure and validation rules for a user document in a MongoDB collection. 
*/
const userSchema: Schema<IUser> = new Schema({
    userId: {
        type: Number,
        required: true,
        unique: true
    },

    username: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        select: false,
    },

    fullName: {
        type: userFullNameSchema,
        required: true
    },

    age: {
        type: Number,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    isActive: {
        type: Boolean,
        required: true,
        default: true
    },

    hobbies: {
        type: [String],
        required: true
    },

    address: {
        type: addressSchema,
        required: true
    },

    orders: {
        type: [userOrdersSchema]
    }

})

/* 
The code `userSchema.pre<IUser>("save", async function(next) { ... })` is a pre-save middleware
function in Mongoose. It is executed before saving a user document to the database. 
*/
userSchema.pre<IUser>("save", async function(next) {
    const user = this

    // making password hash
    user.password = await bcrypt.hash(
        user.password,
        Number(config.bcrypt_salt_rounds)
    )

    next()
})

export const User = model<IUser>("User", userSchema)