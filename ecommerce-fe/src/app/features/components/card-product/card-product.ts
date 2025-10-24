import {Component, inject, input, signal} from '@angular/core';
import {Card} from 'primeng/card';
import {Button} from 'primeng/button';
import {Product} from '../../../models/product';
import {DecimalPipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {InputNumber} from 'primeng/inputnumber';
import {CartService} from '../../../services/cart-service';
import {Toast} from 'primeng/toast';
import {Ripple} from 'primeng/ripple';
import {MessageService} from 'primeng/api';


@Component({
  selector: 'app-card-product',
  imports: [
    Card,
    Button,
    DecimalPipe,
    FormsModule,
    InputNumber,
    Toast,
    Ripple
  ],
  templateUrl: './card-product.html',
  styleUrl: './card-product.scss',
  providers: [MessageService]
})
export class CardProduct {

  cartService = inject(CartService);

  messageService = inject(MessageService);

  product = input<Product>();

  quantityToAddToCart = signal<number>(0)

  addToCart() {
    this.product()!.cartQuantity = this.quantityToAddToCart();
    this.cartService.addToCart(this.product()!, this.product()!.cartQuantity);

    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: `${this.product()?.name} successfully added to cart`,
      key: 'bc'
    });
  }
}
