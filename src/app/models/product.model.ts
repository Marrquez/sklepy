export interface Product {
    id?: string;
    name: string;
    value: number;
    units: number;
    quantity: number;
    price: number;
    available: number;
    own?: boolean;
}

export interface Sell {
    own: boolean;
    products: Array<Product>;
}