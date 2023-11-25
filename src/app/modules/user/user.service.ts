import { IUser, TOrders } from "./user.interface";
import { User } from "./user.model";

/**
 * The function creates a new user using the provided user data and returns the created user.
 * @param {IUser} userData - The `userData` parameter is an object that contains the data needed to
 * create a new user. It should have the following properties:
 * @returns the newly created user object.
 */
export async function createUser(userData: IUser) {
  // Create the user using the mongoose model if the user does not exist
  const newUser = await User.create(userData)
  return newUser
}

/**
 * The function getAllUsers retrieves all users from a MongoDB database using the mongoose model.
 * @returns a promise that resolves to an array of IUser objects.
 */
export async function getAllUsers(): Promise<IUser[]> {
  // Get all users using the mongoose model
  const users = await User.find();
  return users;
}

/**
 * The function `getUserById` retrieves a user by their ID, converts the ID to a number, checks if the
 * user exists, and returns the user if they exist.
 * @param {string} userId - The `userId` parameter is a string that represents the unique identifier of
 * a user.
 * @returns a Promise that resolves to either an IUser object or null.
 */
export async function getUserById(
  userId: string,
): Promise<IUser | null> {
  // Convert the userId to number
  const userIdNumber = Number(userId);

  // Check if the user exists with static method
  const existingUser = await User.isUserExist(userIdNumber);

  if (!existingUser) {
    throw new Error('User does not exist!');
  } else {
    const user = await User.findOne({ userId: userId }).select('-orders');
    return user;
  }
}

/**
 * The updateUser function updates a user's data if the user exists, otherwise it throws an error.
 * @param {string} userId - The userId parameter is a string that represents the unique identifier of
 * the user.
 * @param {IUser} userData - The `userData` parameter is an object that represents the updated user
 * data. It should have properties that match the fields of the `IUser` interface.
 * @returns a Promise that resolves to either an IUser object or null.
 */
export async function updateUser(
  userId: string,
  userData: IUser,
): Promise<IUser | null> {
  // Convert the userId to number
  const userIdNumber = Number(userId);

  // Check if the user exists with static method
  const existingUser = await User.isUserExist(userIdNumber);

  if (!existingUser) {
    throw new Error('User does not exist!');
  } else {
    const updatedUser = await User.findOneAndUpdate(
      { userId: userId },
      userData,
      { new: true },
    );
    return updatedUser;
  }
}

/**
 * The deleteUser function deletes a user with the specified userId and returns the deleted user if it
 * exists.
 * @param {string} userId - The `userId` parameter is a string that represents the unique identifier
 * of the user to be deleted.
 * @returns a Promise that resolves to either an IUser object or null.
 */
export async function deleteUser(userId: string): Promise<IUser | null> {
  // Convert the userId to number
  const userIdNumber = Number(userId);

  // Check if the user exists with static method
  const existingUser = await User.isUserExist(userIdNumber);

  if (!existingUser) {
    throw new Error('User does not exist!');
  } else {
    const deletedUser = await User.findOneAndDelete({ userId: userId });
    return deletedUser;
  }
}

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
export async function addOrder(
  userId: string,
  orderData: TOrders,
): Promise<IUser | null> {
  // Convert the userId to number
  const userIdNumber = Number(userId);

  // Check if the user exists with static method
  const existingUser = await User.isUserExist(userIdNumber);

  if (!existingUser) {
    throw new Error('User does not exist!');
  } else {
    const updatedUser = await User.findOneAndUpdate(
      { userId: userId },
      { $push: { orders: orderData } },
      { new: true },
    );
    return updatedUser;
  }
}