import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './containers/cart/cart.component';
import { FoodDetailsComponent } from './containers/food-details/food-details.component';
import { HomeComponent } from './containers/home/home.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search/:search', component: HomeComponent },
  { path: 'tag/:tag', component: HomeComponent },
  { path: 'food/:id', component: FoodDetailsComponent },
  { path: 'cart', component: CartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
