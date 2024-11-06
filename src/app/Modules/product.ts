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

}
