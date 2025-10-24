import {Component, computed, inject, input, OnInit} from '@angular/core';
import {CardCart} from '../card-cart/card-cart';
import {DecimalPipe} from '@angular/common';
import {Router} from '@angular/router';
import {Button} from 'primeng/button';
import {CartService} from '../../../services/cart-service';
import {Divider} from 'primeng/divider';

@Component({
  selector: 'app-cart',
  imports: [
    CardCart,
    DecimalPipe,
    Button,
    Divider
  ],
  templateUrl: './cart.html',
  styleUrl: './cart.scss'
})
export class Cart implements OnInit {

  router = inject(Router);
  cartService = inject(CartService);

  cartProducts = computed(() => this.cartService.cart());
  viewOnlyCardCart = input<boolean>();
  checkoutCard = input<boolean>(false);

  ngOnInit() {
    if (this.viewOnlyCardCart()) {
      this.checkoutCard();
    }

    this.cartService.loadCart();
  }

  navigateToHome() {
    this.router.navigate(['home']);
  }

  navigateToCheckout() {
    this.router.navigate(['checkout']);
  }
}
