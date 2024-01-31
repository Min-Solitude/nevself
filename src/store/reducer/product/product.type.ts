export type ProductState = {
    loading: boolean;
    products: Product[] | null;
}

export type Product = {
    name: string,
        status: string,
        image: string,
        description: string,
        link: string,
        uid_creator: string,
        createdAt: number,
}