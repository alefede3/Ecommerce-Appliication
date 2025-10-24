import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasedHistory } from './purchased-history';

describe('PurchasedHistory', () => {
  let component: PurchasedHistory;
  let fixture: ComponentFixture<PurchasedHistory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchasedHistory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchasedHistory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
