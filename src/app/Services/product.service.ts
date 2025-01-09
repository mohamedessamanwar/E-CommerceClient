import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAddProduct, IProduct, IProductView } from '../Modules/product';
import { Observable } from 'rxjs';
import { Response } from '../Modules/response';
import { ProductWithPagination } from '../Modules/ProductWithPagination';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://localhost:7138/api/v1.0/Product/ProductWithPagination/V2';
  constructor(private http: HttpClient) { }
 
  getProducts(
    pageNum: number,
    orderBy: number,
    fees: number,
    categoryId: number,
    search: string
  ): Observable<Response<ProductWithPagination>> {
    // Build query parameters with template literals
    const url = `${this.apiUrl}?pageNumber=${pageNum}&orderBy=${orderBy}&fees=${fees}&CategoryId=${categoryId}&Search=${search}`;
    // Make the HTTP GET request
    return this.http.get<Response<ProductWithPagination>>(url);
  }
  AddProduct(product: IAddProduct): Observable<Response<IProductView>> {
    // Create a FormData object
    const formData = new FormData();
    // Append each field to the FormData object
    formData.append('name', product.name);
    formData.append('model', product.model);
    formData.append('description', product.Description);
    formData.append('price', product.price.toString()); // Convert number to string
    formData.append('discount', product.Discount.toString()); // Convert number to string
    formData.append('categoryId', product.categoryId.toString()); // Convert number to string

    if (product.Cover ) {
        formData.append('Cover', product.Cover, product.Cover.name);
      
    }
    // Send the FormData as a POST request
    return this.http.post<Response<IProductView>>('https://localhost:7138/api/v1.0/Product', formData);
}
}