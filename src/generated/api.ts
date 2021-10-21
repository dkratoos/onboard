/* eslint-disable */
import { BaseApiConfig, Context, Fatal, SdkgenError } from "@sdkgen/node-runtime";
export { Fatal } from "@sdkgen/node-runtime";

export interface Episode {
    id: number
    name: string
    season: number
}

export interface User {
    id: string
    name: string
}

export interface Product {
    id: string
    name: string
}

export interface Client {
    id: string
    name: string
    cpf: string
}

export interface Order {
    id: string
    name: string
    number: number
    client: Client
    products: Product[]
}

export interface NewOrder {
    name: string
    number: number
    client: Client
    products: Product[]
}

export class InvalidArgument extends SdkgenError {}

export class ApiConfig<ExtraContextT> extends BaseApiConfig<ExtraContextT> {
    fn!: {
        getEpisodes: (ctx: Context & ExtraContextT, args: {showId: number}) => Promise<Episode[]>
        getUsers: (ctx: Context & ExtraContextT, args: {}) => Promise<User[]>
        createUser: (ctx: Context & ExtraContextT, args: {name: string, age: number}) => Promise<User>
        getProducts: (ctx: Context & ExtraContextT, args: {}) => Promise<Product[]>
        createProduct: (ctx: Context & ExtraContextT, args: {name: string, price: number}) => Promise<Product>
        getClients: (ctx: Context & ExtraContextT, args: {}) => Promise<Client[]>
        createClient: (ctx: Context & ExtraContextT, args: {name: string, cpf: string}) => Promise<Client>
        getOrders: (ctx: Context & ExtraContextT, args: {}) => Promise<Order[]>
        createOrder: (ctx: Context & ExtraContextT, args: {order: NewOrder}) => Promise<Order>
    }

    /** @deprecated api.err shouldn't be used. Import and throw errors directly. */
    err = {
        InvalidArgument(message: string = "") { throw new InvalidArgument(message); },
        Fatal(message: string = "") { throw new Fatal(message); }
    }

    astJson = {
        annotations: {},
        errors: [
            "InvalidArgument",
            "Fatal"
        ],
        functionTable: {
            getEpisodes: {
                args: {
                    showId: "uint"
                },
                ret: "Episode[]"
            },
            getUsers: {
                args: {},
                ret: "User[]"
            },
            createUser: {
                args: {
                    name: "string",
                    age: "uint"
                },
                ret: "User"
            },
            getProducts: {
                args: {},
                ret: "Product[]"
            },
            createProduct: {
                args: {
                    name: "string",
                    price: "float"
                },
                ret: "Product"
            },
            getClients: {
                args: {},
                ret: "Client[]"
            },
            createClient: {
                args: {
                    name: "string",
                    cpf: "cpf"
                },
                ret: "Client"
            },
            getOrders: {
                args: {},
                ret: "Order[]"
            },
            createOrder: {
                args: {
                    order: "NewOrder"
                },
                ret: "Order"
            }
        },
        typeTable: {
            Episode: {
                id: "uint",
                name: "string",
                season: "uint"
            },
            User: {
                id: "uuid",
                name: "string"
            },
            Product: {
                id: "uuid",
                name: "string"
            },
            Client: {
                id: "uuid",
                name: "string",
                cpf: "cpf"
            },
            Order: {
                id: "uuid",
                name: "string",
                number: "uint",
                client: "Client",
                products: "Product[]"
            },
            NewOrder: {
                name: "string",
                number: "uint",
                client: "Client",
                products: "Product[]"
            }
        }
    } as const
}

export const api = new ApiConfig<{}>();
