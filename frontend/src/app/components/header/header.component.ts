import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cartQuantity = 0;
  user!: User;
  constructor( private service: CartService, private userService: UserService) { }

  ngOnInit(): void {
    this.service.getCartObservable().subscribe(cart => {
      this.cartQuantity = cart.totalCount;
    });
    this.userService.userObservable.subscribe((user) => {
      this.user = user;
    })
  }

  logout(){
    this.userService.logout();
  }

  get isAuth(){
    return this.user.token;
  }

}
