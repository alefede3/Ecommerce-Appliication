import { TestBed } from '@angular/core/testing';

import { PurchasedHistoryService } from './purchased-history-service';

describe('PurchasedHistoryService', () => {
  let service: PurchasedHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurchasedHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
