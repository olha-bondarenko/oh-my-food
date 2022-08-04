import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './containers/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { TagsComponent } from './components/tags/tags.component';
import { FoodDetailsComponent } from './containers/food-details/food-details.component';
import { CartComponent } from './containers/cart/cart.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { TitleComponent } from './components/title/title.component';
import { LoginPageComponent } from './containers/login-page/login-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputComponent } from './components/input/input.component';
import { InputValidationComponent } from './components/input-validation/input-validation.component';
import { TextInputComponent } from './components/text-input/text-input.component';
import { ButtonComponent } from './components/button/button.component';
import { RegisterComponent } from './containers/register/register.component';
import { LoadingComponent } from './components/loading/loading.component'
import { LoadingInterceptor } from './shared/interceptors/loading.interceptor';
import { CheckoutComponent } from './containers/checkout/checkout.component';
import { OrderItemsListComponent } from './components/order-items-list/order-items-list.component';
import { MapComponent } from './components/map/map.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { PaymentComponent } from './containers/payment/payment.component';
import { PaypalButtonComponent } from './components/paypal-button/paypal-button.component';
import { OrderTrackComponent } from './containers/order-track/order-track.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SearchComponent,
    TagsComponent,
    FoodDetailsComponent,
    CartComponent,
    NotFoundComponent,
    TitleComponent,
    LoginPageComponent,
    InputComponent,
    InputValidationComponent,
    TextInputComponent,
    ButtonComponent,
    RegisterComponent,
    LoadingComponent,
    CheckoutComponent,
    OrderItemsListComponent,
    MapComponent,
    PaymentComponent,
    PaypalButtonComponent,
    OrderTrackComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      newestOnTop: false
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
