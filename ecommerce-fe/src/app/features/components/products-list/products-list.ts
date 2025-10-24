import {Component, OnDestroy, OnInit, signal} from '@angular/core';
import {Product} from '../../../models/product';
import {inject} from '@angular/core';
import {ProductService} from '../../../services/product-service';
import {CardProduct} from '../card-product/card-product';
import {CartService} from '../../../services/cart-service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-products-list',
  imports: [
    CardProduct,
  ],
  templateUrl: './products-list.html',
  styleUrl: './products-list.scss'
})
export class ProductsList implements OnInit, OnDestroy {

  productsService = inject(ProductService);
  cartService = inject(CartService);

  productsList = signal<Product[]>([]);

  sub = new Subscription();

  ngOnInit() {
    this.sub.add(this.productsService.getAllProducts().subscribe(response => {
      this.productsList.set(response);
    }))

    this.cartService.loadCart();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
