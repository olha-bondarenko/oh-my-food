import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/models/order';

declare let paypal: any;

@Component({
  selector: 'app-paypal-button',
  templateUrl: './paypal-button.component.html',
  styleUrls: ['./paypal-button.component.scss']
})
export class PaypalButtonComponent implements OnInit {

  @Input() order!: Order;
  @ViewChild('paypal', {static: true}) paypalElement!: ElementRef;

  constructor( private orderService: OrderService,
    private cartService: CartService,
    private router: Router,
    private toasterService: ToastrService) { }

  ngOnInit(): void {
    const self = this;
    paypal.Buttons({
      createOrder: (data: any, actions:any) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                currency_code: 'EUR',
                value: self.order.totalPrice
              }
            }
          ]
        })
      },
      onApprove: async (data:any, actions: any) => {
        const payment = await actions.order.capture();
        this.order.paymentId = payment.id;
        self.orderService.pay(this.order).subscribe({
          next: (orderId) => {
            this.cartService.clearCart();
            this.router.navigateByUrl('/track/' + orderId);
            this.toasterService.success('Payment Completed Successfully', 'Success');
          },
          error: (error) => {
            this.toasterService.error('Payment Failed', 'Error')
          }
        })
      },

      onError: (err: any) => {
        this.toasterService.error('Payment Failed', 'Error');
        console.log(err);
      }
    })
    .render(this.paypalElement.nativeElement);
  }

}
