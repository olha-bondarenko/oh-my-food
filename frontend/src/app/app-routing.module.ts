import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { CartComponent } from './containers/cart/cart.component';
import { CheckoutComponent } from './containers/checkout/checkout.component';
import { FoodDetailsComponent } from './containers/food-details/food-details.component';
import { HomeComponent } from './containers/home/home.component';
import { LoginPageComponent } from './containers/login-page/login-page.component';
import { OrderTrackComponent } from './containers/order-track/order-track.component';
import { PaymentComponent } from './containers/payment/payment.component';
import { RegisterComponent } from './containers/register/register.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search/:search', component: HomeComponent },
  { path: 'tag/:tag', component: HomeComponent },
  { path: 'food/:id', component: FoodDetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
  { path: 'payment', component: PaymentComponent, canActivate: [AuthGuard] },
  { path: 'track/:order', component: OrderTrackComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
