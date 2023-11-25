import { Schema, model } from 'mongoose';
import {
  IUser,
  TAddress,
  TFullName,
  TOrders,
  UserModel,
} from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

/* 
The code `const userFullNameSchema: Schema<TFullName> = new Schema({ ... })` is defining a Mongoose
schema for the `TFullName` interface. 
*/
const userFullNameSchema: Schema<TFullName> = new Schema({
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
const addressSchema: Schema<TAddress> = new Schema({
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
const userOrdersSchema: Schema<TOrders> = new Schema({
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
const userSchema: Schema<IUser> = new Schema({
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
userSchema.pre<IUser>('save', async function (next) {
  const user = this;

  // making password hash
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );

  next();
});

/* 
The code `userSchema.post('save', async function (doc, next) { ... })` is a post-save middleware
function in Mongoose. It is executed after saving a user document to the database. 
*/
userSchema.post('save', async function (doc, next) {
  const user = await User.findOne(doc._id).select('-password -orders');
  if (user) {
    Object.assign(doc, user);
  }
  next();
});

/* 
The code `userSchema.post('find', async function (docs: IUser[], next) { ... })` is a post-find
middleware function in Mongoose. It is executed after a find operation is performed on the User
model. 
*/
userSchema.post('find', async function (docs: IUser[], next) {
  //   Making orders field empty
  docs.forEach((doc) => {
    doc.orders = undefined;
  });

  next();
});

/* 
The code `userSchema.post('findOneAndUpdate', async function (doc: IUser, next) { ... })` is a
post-findOneAndUpdate middleware function in Mongoose. It is executed after a findOneAndUpdate
operation is performed on the User model. 
*/
userSchema.post('findOneAndUpdate', async function (doc: IUser, next) {
  //   Making orders field undefined
  doc.orders = undefined;

  next();
});

// Custom static method for the user schema
userSchema.statics.isUserExist = async function (
  userId: number,
): Promise<IUser | null> {
  const user = await this.findOne({ userId: userId });
  return user;
};

/* `export const User = model<IUser, UserModel>("User", userSchema)` is exporting a Mongoose model
named "User" based on the `userSchema` schema. */
export const User = model<IUser, UserModel>('User', userSchema);
