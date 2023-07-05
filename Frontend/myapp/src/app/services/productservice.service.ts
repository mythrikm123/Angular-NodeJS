import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductserviceService {

  constructor(private http:HttpClient) { }

  //get the data
  getData(){
    return this.http.get('http://localhost:3000/api/products')
  }

  //Add the data
  createProduct(product: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/products/', product);
  }

  //Delete the data
  deleteProduct(id:number) {
    return this.http.delete('http://localhost:3000/api/products/'+id)
  }
  //edit and update the data
  updateProduct(id: number, product: any): Observable<any> {
    const url = `${'http://localhost:3000/api/products'}/${id}`;
    return this.http.put<any>(url, product);
  }
}
