import {FormControl} from '@angular/forms';

export interface CheckoutForm {
  shippingMethod: FormControl<'delivery' | 'pickup' | null>;
  phoneNumber: FormControl<string | null>;
  email: FormControl<string | null>;
  name: FormControl<string | null>;
  lastName: FormControl<string | null>;
  address: FormControl<string | null>;
  apartment: FormControl<string | null>;
  postalCode: FormControl<string | null>;
  city: FormControl<string | null>;
}
