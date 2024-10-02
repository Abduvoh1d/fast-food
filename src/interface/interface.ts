export interface ILogin {
    status: boolean;
    username: string,
    password: string,
}

export interface IUser {
    id: number
    username: string,
    email: string,
    isAdmin: true,
    address: IUserAdress
    image: {
        path: string
    }
}

export interface IGetProductByCategory {
    id: number,
    price: number,
    name: string,
    imageDTO: {
        path: string
    },
    weight: number
}

interface IUserAdress {
    country: string,
    street: string,
    city: string,
    number: string
}

export interface IProduct {
    id: number,
    name: string,
    description: string,
    price: number,
    image: {
        path: string
    },
    compound: IProductCompound
    deleted: true
}


interface IProductCompound {
    weight: number,
    size: "SMALL" | "MEDIUM" | "LARGE",
    calories: number,
    fat: number,
    protein: number
}

export interface ICategory {
    id: number,
    path: string,
    name: string
}

export interface IOrderItemDTO {
    id: number
    count: number;
    imagePath: string;
    productId: number;
    productName: string;
    weight: number;
    price: number
}

export interface IBasket {
    orderItemDTOS: IOrderItemDTO[];
    count: number;
    price: number;
}
