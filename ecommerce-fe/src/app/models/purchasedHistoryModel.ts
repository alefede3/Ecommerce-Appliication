import {OrderedProducts} from './orderedProducts';

export interface PurchasedHistoryModel {
  orderDate: number;
  idPurchasedHistory: number;
  total: number;
  orderedProducts: OrderedProducts[];
}
