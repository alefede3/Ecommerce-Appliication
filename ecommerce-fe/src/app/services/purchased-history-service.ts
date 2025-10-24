import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../models/product';
import {PurchasedHistoryModel} from '../models/purchasedHistoryModel';
import {OrderedProducts} from '../models/orderedProducts';
import {PurchasedHistory} from '../features/components/purchased-history/purchased-history';

@Injectable({
  providedIn: 'root'
})
export class PurchasedHistoryService {

  private productsAPIUrl = 'http://localhost:5193';

  http = inject(HttpClient);

  getPurchasedHistory(): Observable<PurchasedHistoryModel[]>{
    return this.http.get<PurchasedHistoryModel[]>(`${this.productsAPIUrl}/getOrders`)
  }

  saveProductsOrdered(products: Product[]): Observable<Product[]>{
    return this.http.post<Product[]>(`${this.productsAPIUrl}/saveOrders`, products);
  }
}
