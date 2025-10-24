import {computed, inject, Injectable, signal} from '@angular/core';
import {Product} from '../models/product';
import {LocalStorageService} from './local-storage-service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  localStorage = inject(LocalStorageService)

  cart = signal<Product[]>([])

  cartLength = computed(() => this.cart().reduce(
    (accumulator, product) => accumulator + (product.cartQuantity), 0,
  ))

  totalAmount = computed(() => {
    return this.cart().reduce(
      (accumulator, product) =>
        accumulator + (product.price * product.cartQuantity), 0)
  })

  totalSaved = signal<number>(0);

  loadCart() {
    this.cart.set(JSON.parse(this.localStorage.getItem("cartProducts") ?? "[]"));
  }

  addToCart(product: Product, quantity: number) {
    const cartTmp = this.cart()

    const existingProduct = cartTmp.find(p => p.idproduct === product.idproduct)

    if (existingProduct) {
      existingProduct.cartQuantity += quantity;
    } else {
      cartTmp.push(product);
      product.cartQuantity = quantity;
    }

    this.cart.set(cartTmp)
    this.localStorage.setItem("cartProducts", cartTmp);

    this.loadCart();
  }

  deleteFromCart(idProduct: number) {
    const updatedCart = this.cart().filter(product => product.idproduct != idProduct)

    this.cart.set(updatedCart);

    this.localStorage.setItem("cartProducts", updatedCart);
  }

  decreaseQuantity(product: Product, quantity: number) {
    this.cart().forEach(p => {
      if (p.idproduct == product.idproduct) {
        p.cartQuantity = quantity;
      }
    })

    this.localStorage.setItem("cartProducts", this.cart());

    this.loadCart();
  }

}
