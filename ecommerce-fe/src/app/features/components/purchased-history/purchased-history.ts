import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {PurchasedHistoryService} from '../../../services/purchased-history-service';
import {Card} from 'primeng/card';
import {DatePipe, DecimalPipe} from '@angular/common';
import {Divider} from 'primeng/divider';
import {PurchasedHistoryModel} from '../../../models/purchasedHistoryModel';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-purchased-history',
  imports: [
    Card,
    DatePipe,
    Divider,
    DecimalPipe
  ],
  templateUrl: './purchased-history.html',
  styleUrl: './purchased-history.scss'
})
export class PurchasedHistory implements OnInit, OnDestroy {

  purchasedHistoryService = inject(PurchasedHistoryService);

  orderHistory = signal<PurchasedHistoryModel[]>([]);

  sub = new Subscription();

  ngOnInit() {
    this.sub.add(this.purchasedHistoryService.getPurchasedHistory().subscribe(value => {
      console.log(value);
      this.orderHistory.set(value);
    }))

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
