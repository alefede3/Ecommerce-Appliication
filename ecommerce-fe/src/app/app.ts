import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Button} from 'primeng/button';
import {ProductsList} from './features/components/products-list/products-list';
import {ToolbarComponent} from './features/components/toolbar-component/toolbar';
import {Cart} from './features/components/cart/cart';
import {OidcSecurityService} from 'angular-auth-oidc-client';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [ToolbarComponent, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, OnDestroy {
  protected readonly title = signal('ecommerce-fe');

  private readonly oidcSecurityService = inject(OidcSecurityService);

  sub = new Subscription();

  ngOnInit() {
    this.sub.add(this.oidcSecurityService.checkAuth().subscribe(({isAuthenticated, userData}) => {
      console.log(isAuthenticated);
      if (!isAuthenticated) {
        this.oidcSecurityService.authorize();
      }
    }));
  }

  login() {
    this.oidcSecurityService.authorize();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
