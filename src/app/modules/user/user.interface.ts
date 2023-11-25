// Type of User's fullName
export type TFullName = {
    firstName: string
    lastName: string
}

// Type of User's address
export type TAddress = {
    street: string
    city: string
    country: string
}

// Type of User's orders
export type TOrders = {
    productName: string
    price: number
    quantity: number
}

// Type of User
export type IUser = {
    userId: number
    username: string
    password: string
    fullName: TFullName
    age: number
    email: string
    isActive: boolean
    hobbies: string[]
    address: TAddress
    orders?: TOrders[]
}