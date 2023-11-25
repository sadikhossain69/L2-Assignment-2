import { IUser } from "./user.interface";
import { User } from "./user.model";

export async function createUser(userData: IUser) {
    // Create the user using the mongoose model if the user does not exist
    const newUser = await User.create(userData)
    return newUser
}