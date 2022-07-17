import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { Order } from 'src/app/shared/models/order';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  order: Order = new Order();
  form!: FormGroup;
  constructor(private cartService: CartService,
    private fb: FormBuilder,
    private userService: UserService,
    private toastrService: ToastrService,
    private orderService: OrderService,
    private router: Router) { }

  ngOnInit(): void {
    const cart = this.cartService.getCart();
    this.order.items = cart.items;
    this.order.totalPrice = cart.totalPrice;
    let {name, address} = this.userService.currentUser;
    this.form = this.fb.group({
      name: [name, Validators.required],
      address: [address, Validators.required]
    })
  }

  get fc(){
    return this.form.controls;
  }

  createOrder(){
    if (this.form.invalid) {
      this.toastrService.warning('Please fill the inputs', 'Invalid Inputs')
      return;
    }
    if (!this.order.addressLatLng) {
      this.toastrService.warning('Please select your location on the map', 'Location');
      return;
    }
    this.order.name = this.fc['name'].value;
    this.order.address = this.fc['address'].value;

    this.orderService.create(this.order).subscribe({
      next:() => {
        this.router.navigateByUrl('/payment')
      },
      error: (errorResp: any) => {
        this.toastrService.error(errorResp.error, 'Cart')
      }
    })
  }

}
