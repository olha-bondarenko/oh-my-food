import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { sample_basic_cart, sample_cart, sample_cart_item, sample_foods } from 'src/data';
import { Cart } from '../shared/models/cart';
import { CartItem } from '../shared/models/cart-item';

import { CartService } from './cart.service';

describe('CartService', () => {
  let service: CartService,
  cart: Cart,
  cartItem: CartItem,
  basicCart: any;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CartService
      ]
    });
    service = TestBed.inject(CartService);
    cart = service.cart;
    cartItem = sample_cart_item;
    basicCart = sample_basic_cart;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('#addToCart should add food to cart', () => {
    service.addToCart(sample_foods[1]);
    expect(cart.items.length).toBe(1);
    expect(cartItem.food.id).toBe('2')
  });

  it('#changeQuantity should change quantity of items', () => {
    service.changeQuantity('2', 2);
    expect(cartItem.quantity).toEqual(2);
    expect(cartItem.price).toEqual(cartItem.quantity * cartItem.food.price);
  });
  
  it('#removeFromCart should remove food from cart', () => {
    service.removeFromCart('2');
    expect(cart).toEqual(basicCart);
  });
  
});
