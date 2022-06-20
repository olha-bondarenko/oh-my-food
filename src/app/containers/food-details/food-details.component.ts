import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/food';

@Component({
  selector: 'app-food-details',
  templateUrl: './food-details.component.html',
  styleUrls: ['./food-details.component.scss']
})
export class FoodDetailsComponent implements OnInit {
  food!: Food;
  constructor(
    private route: ActivatedRoute,
    private service: FoodService,
    private cartService: CartService,
    private router: Router ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) this.food = this.service.getFoodById(params['id']);
    })
  }

  addToCart() {
    this.cartService.addToCart(this.food);
    this.router.navigate(['cart']);
  }

}
