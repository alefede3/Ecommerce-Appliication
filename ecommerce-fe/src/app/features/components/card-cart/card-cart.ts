import {Component, computed, effect, inject, Input, input, OnInit, signal} from '@angular/core';
import {Card} from "primeng/card";
import {Product} from '../../../models/product';
import {DecimalPipe} from '@angular/common';
import {InputNumber} from 'primeng/inputnumber';
import {FormsModule} from '@angular/forms';
import {Button} from 'primeng/button';
import {CartService} from '../../../services/cart-service';

@Component({
  selector: 'app-card-cart',
  imports: [
    Card,
    DecimalPipe,
    InputNumber,
    FormsModule,
    Button
  ],
  templateUrl: './card-cart.html',
  styleUrl: './card-cart.scss'
})
export class CardCart implements OnInit {

  cartService = inject(CartService);

  cart = this.cartService.cart();

  selectedQuantity = signal<number>(0);
  cartProduct = input<Product>();
  checkoutCard = input<boolean>(true);

  ngOnInit() {
    if (this.cartProduct()) {
      this.selectedQuantity.set(this.cartProduct()!.cartQuantity ?? 0);
    }
  }

  onSelectedQuantityChange(newQuantity: number) {
    if (newQuantity > this.cartProduct()?.cartQuantity!) {
      this.cartService.addToCart(this.cartProduct()!, (newQuantity - this.cartProduct()?.cartQuantity!));
    } else if (newQuantity == 0) {
      this.cartService.deleteFromCart(this.cartProduct()?.idproduct!)
    } else {
      this.cartService.decreaseQuantity(this.cartProduct()!, newQuantity);
    }
  }

  removeFromCart(idProduct: number) {
    this.cartService.deleteFromCart(idProduct);
  }
}
