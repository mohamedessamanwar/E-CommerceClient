export interface IProductShoppingCartView {
    shoppingCartId: string;
    productId: number;
    name: string;
    model: string;
    price: number;
    urls: (string | null)[];
    currentPrice: number;
    discount: number;
    description: string;
    itemCount: number;
}
  export interface IShoppingCartView {
    productShoppingCartViews: IProductShoppingCartView[];
    subTotal: number;
    itemCount: number;}
    