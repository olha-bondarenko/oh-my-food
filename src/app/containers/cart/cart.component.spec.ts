import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { sample_cart } from 'src/data';

import { CartComponent } from './cart.component';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async () => {
    const cartServiceSpy = jasmine.createSpyObj<CartService>(['getCartObservable']);
    cartServiceSpy.getCartObservable.and.returnValue(of(sample_cart));
    await TestBed.configureTestingModule({
      declarations: [ CartComponent ],
      providers: [{provide: CartService, useValue: cartServiceSpy}],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should have items in the cart', () => {
    expect(component.cart.items.length).toBe(1);
  });

  it('should display image', () => {
    let img = fixture.debugElement.queryAll(By.css('img'))
    expect(img.length).toBe(1);
  });
});
