import { TestBed } from '@angular/core/testing';

import { FoodService } from './food.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'
import { sample_foods, sample_tags } from 'src/data';
import { FOODS_BY_SEARCH_URL, FOODS_BY_TAG_URL, FOODS_TAGS_URL, FOODS_URL } from '../shared/constants/urls';

describe('FoodService', () => {
  let service: FoodService,
  httpTestingController: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        FoodService
      ]
    });
    service = TestBed.inject(FoodService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getAll should return all foods', () => {
    service.getAll().subscribe(foods => {
      expect(foods).toBeTruthy();
      expect(foods.length).toBe(6);
    });
    const req = httpTestingController.expectOne(FOODS_URL);
    expect(req.request.method).toEqual('GET');
    req.flush(sample_foods)
  });

  it('#getFoodById should return food by ID', () => {
    service.getFoodById('2').subscribe(food => {
      expect(food).toBeTruthy();
      expect(food.id).toBe('2');
    });
    const req = httpTestingController.expectOne(FOODS_URL + '/2');
    expect(req.request.method).toEqual('GET');
    req.flush(sample_foods[1]);
  });

  it('#getAllTags should return all tags', () => {
    service.getAllTags().subscribe(tags => {
      expect(tags).toBeTruthy();
      expect(tags.length).toBe(8);
      const tag = tags.find(tag => tag.name == 'All');
      expect(tag?.count).toBe(6)
    });
    const req = httpTestingController.expectOne(FOODS_TAGS_URL);
    expect(req.request.method).toEqual('GET');
    req.flush(sample_tags)
  });

  it('#getAllFoodBySearch should return all food by search', () => {
    const expectedData = [sample_foods[3]]
    service.getAllFoodBySearch('potato').subscribe(foods => {
      expect(foods).toBeTruthy();
      expect(foods).toEqual(expectedData);
    });
    const req = httpTestingController.expectOne(FOODS_BY_SEARCH_URL + 'potato');
    expect(req.request.method).toEqual('GET');
    req.flush(expectedData)
  });

  it('#getAllFoodByTag should return all food by tag', () => {
    const expectedData = [sample_foods[3]]
    service.getAllFoodByTag('Soup').subscribe(foods => {
      expect(foods).toBeTruthy();
      expect(foods).toEqual(expectedData);
    });
    const req = httpTestingController.expectOne(FOODS_BY_TAG_URL + 'Soup');
    expect(req.request.method).toEqual('GET');
    req.flush(expectedData)
  });

  afterEach(() => {
    httpTestingController.verify();
  })
});
