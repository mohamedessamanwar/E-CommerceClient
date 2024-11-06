import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../Modules/product';
import { Observable } from 'rxjs';
import { Response } from '../Modules/response';
import { ProductWithPagination } from '../Modules/ProductWithPagination';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://localhost:7138/api/Product/ProductWithPagination/V2';
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
}
