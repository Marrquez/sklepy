export interface Product {
    id: string;
    name: string;
    value: number;
    units: number;
    quantity: number;
    price: number;
    available: number;
}

export interface Sell {
    own: boolean;
    products: Array<Product>;
}

export interface User {
    name: string;
    uid: string;
}

export interface TransactionDetail {
    incomes: number;
    outcomes: number;
    earnings: number;
}

export interface Transaction {
    date: string;
    details: Array<TransactionDetail>;
}