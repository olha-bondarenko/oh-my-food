import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cartQuantity = 0;
  constructor( private service: CartService) { }

  ngOnInit(): void {
    this.service.getCartObservable().subscribe(cart => {
      this.cartQuantity = cart.totalCount;
    })
  }

}
