export interface IProduct {
    id: number;
    name: string;
    model: string;
    price: number;
    categoryName: string;
    imageUrl?: string[];
    currentPrice: number;
    discount: number;
    description: string;
    count: number;

}

export interface IProductView {
    id: number;
    name: string;
    model: string;
    price: number;
    currentPrice: number;
    discount: number;
    description: string;
}

export interface IAddProduct {
    name: string;
    Description:string
    model: string;   
    price: number;
    Discount : number
    categoryId: number;
    Cover?: File ; 
}



 export interface IProductDetails {
    id: number;
    name: string;
    model: string;
    price: number;
    currentPrice: number;
    discount: number;
    description: string;
    categoryName: string;
    categoryID: number;
    images: string[];
    count: number;
}
