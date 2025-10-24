import {Component, computed, inject, OnInit} from '@angular/core';
import {Button} from 'primeng/button';
import {Router} from '@angular/router';
import {CartService} from '../../../services/cart-service';
import {Card} from 'primeng/card';
import {Divider} from 'primeng/divider';
import {PaymentService} from '../../../services/payment-service';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-payment-confirmed',
  imports: [
    Button,
    Card,
    Divider,
    DecimalPipe
  ],
  templateUrl: './payment-confirmed.html',
  styleUrl: './payment-confirmed.scss'
})
export class PaymentConfirmed implements OnInit {

  router = inject(Router);
  cartService= inject(CartService);
  paymentService= inject(PaymentService);

  detailFormValues = computed(() =>
    this.paymentService.checkOutFormValues())

  ngOnInit() {
    this.cartService.loadCart();
  }

  navigateToHome(){
    this.router.navigate(['home']);
  }
}
