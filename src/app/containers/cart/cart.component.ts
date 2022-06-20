import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/shared/models/cart';
import { CartItem } from 'src/app/shared/models/cart-item';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart!: Cart;
  constructor( private service: CartService) { }

  ngOnInit(): void {
    this.service.getCartObservable().subscribe(cart => this.cart = cart);
  }

  removeFromCart(cartItem: CartItem) {
    this.service.removeFromCart(cartItem.food.id);
  }

  changeQuantity(cartItem: CartItem, quantityInString: string) {
    const quantity = parseInt(quantityInString);
    this.service.changeQuantity(cartItem.food.id, quantity);
  }

}
