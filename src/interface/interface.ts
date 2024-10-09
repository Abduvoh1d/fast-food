export interface ILogin {
    username: string,
    password: string,
}

export interface IRegisterDTO {
    tokens: {
        accessToken: string,
        refreshToken: string
    },
    role: string
}

export interface IRegister {
    username: string,
    password: string,
    email: string
}

export interface IAllUsers {
    id: number,
    username: string,
    email: string,
    roles: {
        roleName: string,
        description: string
    },
    deleted: true
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

export interface Tokens {
    accessToken: string
    refreshToken: string
}