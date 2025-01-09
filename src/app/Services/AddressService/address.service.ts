import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAddress } from '../../Modules/Address';
import { Response } from '../../Modules/response';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) { }

 getAddress():Observable<Response<IAddress[]>>{
  
 return this.http.get<Response<IAddress[]>>('https://localhost:7138/api/Address');

 }


}
