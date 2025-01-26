import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IReview, ReviewData } from '../Modules/Review';
import { Observable } from 'rxjs';
import { Response } from '../Modules/response';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
   baseUrl = 'https://localhost:7138/api/Review';
  constructor(private http: HttpClient) { }

  addReview(review: IReview):Observable<Response<IReview>> {
    console.log(review);
    return this.http.post<Response<IReview>>(this.baseUrl, review , { headers: { 'Content-Type': 'application/json' } });
  }
  viewReview(id:number):Observable<Response<ReviewData>> {
    return this.http.get<Response<ReviewData>>(`${this.baseUrl}/${id}`);
  }

}
