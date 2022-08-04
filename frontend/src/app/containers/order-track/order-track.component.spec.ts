import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { OrderService } from 'src/app/services/order.service';
import { sample_order } from 'src/data';

import { OrderTrackComponent } from './order-track.component';

describe('OrderTrackComponent', () => {
  let component: OrderTrackComponent;
  let fixture: ComponentFixture<OrderTrackComponent>;
  let router: Router;
  const orderServiceSpy = jasmine.createSpyObj<OrderService>(['trackOrderById']);
  let service: OrderService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderTrackComponent ],
      imports: [RouterTestingModule],
      providers: [{provide: OrderService, useValue: orderServiceSpy}],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
    service = TestBed.inject(OrderService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should return order by ID', () => {

  //   let params = {
  //     order: 2
  //   }
  //   spyOn(service, 'trackOrderById')..and.returnValue(of(sample_order));
  //   // orderServiceSpy.trackOrderById.and.withArgs(params['order']).and.returnValue(of(sample_order))

  //   expect(component.order.items.length).toBe(1);


  // });

});

