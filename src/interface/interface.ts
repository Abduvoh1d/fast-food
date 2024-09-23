interface IUserAdress {
    country: string,
    street: string,
    city: string,
    number: string
}

interface IProductCompound {
    weight: number,
    size: "SMALL" | "MEDIUM" | "LARGE",
    calories: number,
    fat: number,
    protein: number
}

export interface IUser {
    username: string,
    email: string,
    isAdmin: true,
    address: IUserAdress
    image: {
        path: string
    }
}

export interface ILogin {
    username: string,
    password: string,
}

export interface ICategory {
    id: number,
    path: string,
    name: string
}

export interface IProduct {
    name: string
    description: string
    price: number
    image: {
        path: string
    },
    compound: IProductCompound
    deleted: true
}