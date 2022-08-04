import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { sample_order } from 'src/data';
import { ORDER_CREATE_URL, ORDER_NEW_FOR_CURRENT_USER_URL, ORDER_PAY_URL, ORDER_TRACK_URL } from '../shared/constants/urls';
import { Order } from '../shared/models/order';

import { OrderService } from './order.service';

describe('OrderService', () => {
  let service: OrderService,
  httpTestingController: HttpTestingController,
  order: Order;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OrderService
      ]
    });
    service = TestBed.inject(OrderService);
    httpTestingController = TestBed.inject(HttpTestingController);
    order = sample_order;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#create should create order', () => {
    service.create(order).subscribe(order => {
      expect(order.id).toBe(2);
    });
    const req = httpTestingController.expectOne(ORDER_CREATE_URL);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body.id).toBe(2);
    req.flush(order);
  });

  it('#getNewOrderForCurrentUser should get order for the user', () => {
    service.getNewOrderForCurrentUser().subscribe(user => {
      expect(user).toBeTruthy();
      expect(order.id).toBe(2);
    });
    const req = httpTestingController.expectOne(ORDER_NEW_FOR_CURRENT_USER_URL);
    expect(req.request.method).toEqual('GET');
    req.flush(order);
  });

  it('#pay should pay for order', () => {
    service.pay(order).subscribe(order => {
      expect(order.id).toBe(2);
    });
    const req = httpTestingController.expectOne(ORDER_PAY_URL);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body.id).toBe(2);
    req.flush(order);
  });

  it('#trackOrderById should track order by ID', () => {
    service.trackOrderById(2).subscribe(order => {
      expect(order.id).toBe(2);
      expect(order.items.length).toBe(1);
    });
    const req = httpTestingController.expectOne(ORDER_TRACK_URL + '2');
    expect(req.request.method).toEqual('GET');
    req.flush(order);
  });

});
