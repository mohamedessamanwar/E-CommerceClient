import { IProduct } from './product';
export interface ProductWithPagination {
    count: number;
    products: IProduct[];
}
