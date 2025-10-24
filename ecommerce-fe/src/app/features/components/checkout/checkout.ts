import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {CardModule} from 'primeng/card';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {Router} from '@angular/router';
import {CartService} from '../../../services/cart-service';
import {Cart} from '../cart/cart';
import {CommonModule, DecimalPipe} from '@angular/common';
import {RadioButtonModule} from 'primeng/radiobutton';
import {DialogModule} from 'primeng/dialog';
import {InputGroupModule} from 'primeng/inputgroup';
import {InputGroupAddon} from 'primeng/inputgroupaddon';
import {LocalStorageService} from '../../../services/local-storage-service';
import {ProductService} from '../../../services/product-service';
import {Subscription, switchMap, tap} from 'rxjs';
import {PaymentService} from '../../../services/payment-service';
import {CheckoutForm} from '../../../models/checkoutForm';
import {PurchasedHistoryService} from '../../../services/purchased-history-service';
import {DatePickerModule} from 'primeng/datepicker';
import {InputMask} from 'primeng/inputmask';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CardModule,
    FormsModule,
    InputTextModule,
    Cart,
    ButtonModule,
    DecimalPipe,
    CommonModule,
    RadioButtonModule,
    ReactiveFormsModule,
    DialogModule,
    InputGroupModule,
    InputGroupModule,
    InputGroupAddon,
    DatePickerModule,
    InputMask,
  ],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss'
})
export class Checkout implements OnInit, OnDestroy {

  purchasedHistory = inject(PurchasedHistoryService);

  checkOutForm = new FormGroup<CheckoutForm>({
    shippingMethod: new FormControl(null, [Validators.required]),
    phoneNumber: new FormControl(null, [Validators.required, Validators.pattern(/^(\+39)?\d{9,10}$/)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    name: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]),
    lastName: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]),
    address: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]),
    apartment: new FormControl(null),
    postalCode: new FormControl(null, [Validators.required, Validators.pattern(/^\d{5}$/)]),
    city: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Za-z]+$/)])
  })


  paymentForm = new FormGroup({
    nameOnCard: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/)]),
    cardNumber: new FormControl(null, [Validators.required, Validators.pattern(/^\d{13,19}$/)]),
    expiration: new FormControl(null, [Validators.required,  Validators.pattern(/^([1-9])([1-9])\/[0-9]{4}$/)]),
    cvc: new FormControl(null, [Validators.required, Validators.pattern(/^\d{3}$/)])
  });

  cartService = inject(CartService);
  localStorage = inject(LocalStorageService)
  productService = inject(ProductService);
  router = inject(Router);
  paymentService = inject(PaymentService);

  sub = new Subscription();

  ngOnInit(): void {
    this.cartService.loadCart()

    this.sub.add(this.checkOutForm.valueChanges.subscribe(values => {
      this.paymentService.formValues(values);
    }))
  }

  paymentDialog = signal<boolean>(false);

  showPaymentDialog() {
    this.paymentDialog.set(true)
  }

  onPayment() {
    const total = this.cartService.totalAmount();
    this.cartService.totalSaved.set(total);

    this.sub.add(
      this.purchasedHistory.saveProductsOrdered(this.cartService.cart()).pipe(
        switchMap(() =>
          this.productService.updateProductQuantity(this.cartService.cart())
        ),
        tap(() => {
          this.localStorage.clearItems()
          this.paymentDialog.set(false);
        }),
        switchMap(() => this.router.navigate(['paymentConfirmed'])
        )
      ).subscribe()
    )
  }

  isButtonDisabled() {
    return this.cartService.cart().length === 0 || !this.checkOutForm.valid;
  }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
