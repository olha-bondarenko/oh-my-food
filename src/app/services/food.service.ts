import { Injectable } from '@angular/core';
import { sample_foods, sample_tags } from 'src/data';
import { Food } from '../shared/models/food';
import { Tag } from '../shared/models/tag';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor() { }

  getAll(): Food[] {
    return sample_foods;
  }

  getAllFoodBySearch(search: string) {
    return this.getAll().filter(data => data.name.toLowerCase().includes(search.toLowerCase()));
  }

  getAllTags():Tag[] {
    return sample_tags;
  }

  getAllFoodByTag(tag: string):Food[] {
    return tag == "All" ? this.getAll() : this.getAll().filter(data => data.tags?.includes(tag));
  }
}
