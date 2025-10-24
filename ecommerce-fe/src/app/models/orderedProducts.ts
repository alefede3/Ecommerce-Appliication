import {PurchasedHistoryModel} from './purchasedHistoryModel';
import {Product} from './product';

export interface OrderedProducts{
  quantityProduct: number;
  idProduct: number;
  idPurchasedHistory: number;
  purchasedHistory: PurchasedHistoryModel;
  product: Product;
}
