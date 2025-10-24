import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {

  viewCartIcon = signal<boolean>(false);
  viewCheckoutIcon = signal<boolean>(false);

  setVisibilityCartIcon() {
    return this.viewCartIcon.set(true);
  }

  setVisibilityCheckoutIcon() {
    return this.viewCheckoutIcon.set(true);
  }
}
