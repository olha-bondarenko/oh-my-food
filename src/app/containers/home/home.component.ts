import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  foods: Food[] = []
  constructor( 
    private service: FoodService, 
    private route: ActivatedRoute) { 
    }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['search']) this.foods = this.service.getAllFoodBySearch(params['search']);
      else if (params['tag']) this.foods = this.service.getAllFoodByTag(params['tag']);
      else this.foods = this.service.getAll();
    })
  }

}
