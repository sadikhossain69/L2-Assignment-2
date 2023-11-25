import { IUser } from "./user.interface";
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