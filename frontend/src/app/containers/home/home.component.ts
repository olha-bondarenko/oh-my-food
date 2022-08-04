import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
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
    let foodsObservable:Observable<Food[]>;
    this.route.params.subscribe((params) => {
      if (params['search']) foodsObservable= this.service.getAllFoodBySearch(params['search']);
      else if (params['tag']) foodsObservable = this.service.getAllFoodByTag(params['tag']);
      else foodsObservable = this.service.getAll();
      foodsObservable.subscribe(data => this.foods = data);
    })
  }

}
