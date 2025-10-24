import {Injectable, signal} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  checkOutFormValues = signal({
    name: '',
    email: '',
    phoneNumber: '',
    lastName: '',
    address: '',
    apartment: '',
    postalCode: '',
    city: '',
  });

  formValues(values: any){
    this.checkOutFormValues.set(values);
  }
}
