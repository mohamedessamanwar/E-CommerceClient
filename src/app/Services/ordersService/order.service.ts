import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddOrder, OrderAddState } from '../../Modules/order';
import { Observable } from 'rxjs';
import { Response } from '../../Modules/response';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }
/*************  ✨ Codeium Command 🌟  *************/
  CreateOrder(order: AddOrder): Observable<Response<OrderAddState>> {
    return this.http.post<Response<OrderAddState>>('https://localhost:7138/api/Order/AddOrder/', order, { headers: { 'Content-Type': 'application/json' } });
  }
}
