/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { validateUser } from "./user.validation";
import { createUser, getAllUsers, getUserById, updateUser } from "./user.service";

/**
 * The function `createUsers` is an asynchronous function that creates a new user, validates the user
 * data, and sends a response with the created user's data.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made to the
 * server. It contains information such as the request headers, request body, request method, and
 * request URL.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It is an instance of the `Response` class from the Express framework. It has
 * methods like `status()` to set the HTTP status code, `json()` to send a JSON response, and
 */
export const createUsers = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        // Get the user data from the request body
        const user = req.body;

        //   Check if the user.hobbies is an array. If not, make it an array.
        if (!Array.isArray(user.hobbies)) {
            user.hobbies = [user.hobbies];
        }

        // Validate the incoming user data
        const validatedUser = validateUser(user);

        // Create the user using the service function
        const newUser = await createUser(validatedUser);

        // Send the response
        res.status(201).json({
            success: true,
            message: 'User created successfully!',
            data: newUser,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        // Handle errors, send an appropriate response
        res.status(400).json({
            success: false,
            message: 'Failed to create user!',
            error: {
                code: 400,
                description: error.message,
            },
        });
    }
};

/**
 * The getUsersController function is an asynchronous function that handles a request to fetch all
 * users and sends a response with the fetched users or an error message.
 * @param {Request} req - The `req` parameter represents the HTTP request object, which contains
 * information about the incoming request such as headers, query parameters, and request body.
 * @param {Response} res - The `res` parameter is the response object that is used to send the HTTP
 * response back to the client. It is an instance of the `Response` class from the Express framework.
 */
export const getUsersController = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        // Get all users using the service function
        const users = await getAllUsers();

        // Send the response
        res.status(200).json({
            success: true,
            message: 'Users fetched successfully!',
            data: users,
        });
    } catch (error: any) {
        // Handle errors, send an appropriate response
        res.status(400).json({
            success: false,
            message: 'Failed to fetch users!',
            error: {
                code: 400,
                description: error.message,
            },
        });
    }
};

/**
 * This is a TypeScript controller function that fetches a user by their ID and sends a response with
 * the user data.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made to the
 * server. It contains information such as the request headers, request body, request method, request
 * URL, and request parameters.
 * @param {Response} res - The `res` parameter is the response object that is used to send the HTTP
 * response back to the client. It is an instance of the `Response` class from the Express framework.
 */
export const userByIdController = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        // Get the user id from the request params
        const { userId } = req.params;

        // Get the user using the service function
        const user = await getUserById(userId);

        // Send the response
        res.status(200).json({
            success: true,
            message: 'User fetched successfully!',
            data: user,
        });
    } catch (error: any) {
        // Handle errors, send an appropriate response
        res.status(400).json({
            success: false,
            message: 'Failed to fetch user!',
            error: {
                code: 400,
                description: error.message,
            },
        });
    }
};

/* The `updateAUser` function is an asynchronous function that handles a request to update a user's
data. It takes in two parameters: `req` and `res`, which represent the HTTP request and response
objects, respectively. */
export const updateAUser = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      // Get the user id from the request params
      const { userId } = req.params;
  
      // Get the user data from the request body
      const userData = req.body;
  
      // Validate the incoming user data
      const validatedUser = validateUser(userData);
  
      // Update the user using the service function
      const updatedUser = await updateUser(userId, validatedUser);
  
      // Send the response
      res.status(200).json({
        success: true,
        message: 'User updated successfully!',
        data: updatedUser,
      });
    } catch (error: any) {
      // Handle errors, send an appropriate response
      res.status(400).json({
        success: false,
        message: 'Failed to fetch user!',
        error: {
          code: 400,
          description: error.message,
        },
      });
    }
  };