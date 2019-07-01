import { TestBed } from '@angular/core/testing';

import { PlaceOrderService } from './place-order.service';

describe('PlaceOrderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlaceOrderService = TestBed.get(PlaceOrderService);
    expect(service).toBeTruthy();
  });
});
