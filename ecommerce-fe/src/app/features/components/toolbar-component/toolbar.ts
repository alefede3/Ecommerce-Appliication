import {Component, computed, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {Button} from 'primeng/button';
import {Toolbar} from 'primeng/toolbar';
import {Router} from '@angular/router';
import {OverlayBadge} from 'primeng/overlaybadge';
import {CartService} from '../../../services/cart-service';
import {Breadcrumb} from 'primeng/breadcrumb';
import {MenuItem} from 'primeng/api';
import {Subscription} from 'rxjs';
import {Drawer} from 'primeng/drawer';
import {TieredMenuModule} from 'primeng/tieredmenu';
import {OidcSecurityService} from 'angular-auth-oidc-client';

@Component({
  selector: 'app-toolbar-component',
  imports: [
    Button,
    Toolbar,
    OverlayBadge,
    Breadcrumb,
    Drawer,
    TieredMenuModule,
  ],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.scss'
})
export class ToolbarComponent implements OnInit, OnDestroy {

  router = inject(Router);
  cartService = inject(CartService);


  currentUrl: string = '';
  showCartIcon = signal<boolean>(false);
  showCheckoutIcon = signal<boolean>(false);
  showOrderHistory = signal<boolean>(false);
  oidcSecurityService = inject(OidcSecurityService)

  showSidebar: boolean = false;

  items = computed<MenuItem[]>(() => [
    { label: 'Cart', routerLink: '/cart', visible: this.showCartIcon() },
    { label: 'Checkout & Payment', routerLink: '/checkout', disabled: this.cartService.cart().length === 0,
      visible: this.showCheckoutIcon()},
    { label: 'Order History', routerLink: '/purchasedHistory', visible: this.showOrderHistory() },
  ]);

  home: MenuItem = { icon: 'pi pi-home', routerLink: 'home' };
  logoutMenu: MenuItem[] = [];
  sideBarMenu: MenuItem[] = [];

  cartElementsLength = computed(() => this.cartService.cartLength())

  sub = new Subscription();

  ngOnInit(): void {
    this.sideBarMenu = [
      { label: 'Products List', icon: "pi pi-list", routerLink: ['home']},
      { label: 'Shopping Cart', icon: "pi pi-shopping-cart", routerLink: ['cart']},
      { label: 'Order History', icon: "pi pi-history", routerLink: ['purchasedHistory']}
    ]

    this.logoutMenu = [
      {label: 'Log out', icon: 'pi pi-sign-out'},
    ]

    this.sub.add(this.router.events.subscribe(() => {
      this.currentUrl = this.router.url;

      this.showCartIcon.set(this.currentUrl.includes('cart'))
      this.showCheckoutIcon.set(this.currentUrl.includes('checkout'))
      this.showOrderHistory.set(this.currentUrl.includes('purchasedHistory'))
    }))


  }

  logout() {
    this.sub.add(this.oidcSecurityService.logoff().subscribe((result) => console.log(result)));

  }


  goToCartList(){
    this.router.navigate(['cart']);
    this.showSidebar = false;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
