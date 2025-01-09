import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from '../../Modules/response';
import { BehaviorSubject, Observable } from 'rxjs';
import { IAddToCart } from '../../Modules/AddToCary';
import { IShoppingCartView } from '../../Modules/Cart';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  countobs = new BehaviorSubject<number>(0);
  constructor(private http: HttpClient) { }

  AddToCart(AddToCartItem: IAddToCart): Observable<Response<IAddToCart>> {
    return this.http.post<Response<IAddToCart>>('https://localhost:7138/api/ShoppingCart/', 
      JSON.stringify(AddToCartItem), 
      { headers: { 'Content-Type': 'application/json' } }
    );
  }
  getCarts (): Observable<Response<IShoppingCartView>> {
    return this.http.get<Response<IShoppingCartView>>('https://localhost:7138/api/ShoppingCart');
  }

  Increase ( id:string): Observable<Response<IAddToCart>> {
    return this.http.post<Response<IAddToCart>>(`https://localhost:7138/api/ShoppingCart/increase/${id}`, null);
  }

  Decrease ( id:string): Observable<Response<IAddToCart>> {
    return this.http.post<Response<IAddToCart>>(`https://localhost:7138/api/ShoppingCart/decrease/${id}`, null);
  }
  Remove(id: string):Observable<Response<IAddToCart>>  {
    return this.http.delete<Response<IAddToCart>>(`https://localhost:7138/api/ShoppingCart/delete/${id}`);
  
  }

}