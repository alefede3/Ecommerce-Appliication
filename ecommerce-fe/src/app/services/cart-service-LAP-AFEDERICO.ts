import {computed, inject, Injectable, signal} from '@angular/core';
import {Product} from '../models/product';
import {LocalStorageService} from './local-storage-service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  localStorage = inject(LocalStorageService)

  cart = signal<Product[]>([])

  cartElements = computed(() => this.cart().length)

  loadCart(){
    this.cart.set(JSON.parse(this.localStorage.getItem("cartProducts") ?? "[]"));
  }

  addToCart(product: Product, quantity: number) {
    for (let i = 0; i < quantity; i++) {
      this.localStorage.setItem("cartProducts", ([...(JSON.parse(this.localStorage.getItem("cartProducts") || "[]")) as Product[], product]));
    }
  }

  deleteFromCart(idProduct: number) {
    const updatedCart = this.cart().filter(product => product.idproduct != idProduct)

    this.cart.set(updatedCart);

    this.localStorage.setItem("cartProducts", updatedCart);
  }
}
