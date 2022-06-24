import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { sample_foods, sample_tags } from 'backend/src/data';
import { Observable } from 'rxjs';
import { FOODS_BY_SEARCH_URL, FOODS_BY_TAG_URL, FOODS_TAGS_URL, FOODS_URL, FOOD_BY_ID_URL } from '../shared/constants/urls';
import { Food } from '../shared/models/food';
import { Tag } from '../shared/models/tag';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor( private http: HttpClient) { }

  getAll(): Observable<Food[]> {
    return this.http.get<Food[]>(FOODS_URL);
  }

  getAllFoodBySearch(search: string) {
    return this.http.get<Food[]>(FOODS_BY_SEARCH_URL + search);
  }

  getAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(FOODS_TAGS_URL);
  }

  getAllFoodByTag(tag: string): Observable<Food[]> {
    return tag == "All" ? this.getAll() : this.http.get<Food[]>(FOODS_BY_TAG_URL + tag);
  }

  getFoodById(id: string): Observable<Food> {
    return this.http.get<Food>(FOOD_BY_ID_URL + id)
  }
}
