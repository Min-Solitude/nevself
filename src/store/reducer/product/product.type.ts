import { User } from "../auth/auth.type";

export type ProductState = {
    loading: boolean;
    products: Product[] | null;
    product: Product | null;
    author: User | null;
}

export type Product = {
    name: string,
        status: string,
        image: string,
        description: string,
        link: string,
        uid_creator: string,
        createdAt: number,
        uuid: string,
        updatedAt?: number,
        likes?: string[],
}
