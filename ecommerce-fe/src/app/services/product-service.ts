import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsAPIUrl = 'http://localhost:5193';

  httpClient = inject(HttpClient);

  getAllProducts(): Observable<Product[]>{
    return this.httpClient.get<Product[]>(`${this.productsAPIUrl}/all`);
  }

  updateProductQuantity(products: Product[]): Observable<void> {
    return this.httpClient.patch<void>(`${this.productsAPIUrl}/updateQuantity`, products);
  }
}
