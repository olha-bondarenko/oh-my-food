import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { SearchComponent } from 'src/app/components/search/search.component';
import { FoodService } from 'src/app/services/food.service';
import { sample_foods } from 'src/data';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    const foodServiceSpy = jasmine.createSpyObj<FoodService>(['getAll']);
    foodServiceSpy.getAll.and.returnValue(of(sample_foods))
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [RouterTestingModule],
      providers: [
        {provide: FoodService, useValue: foodServiceSpy}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have food', () => {
    expect(component.foods.length).toBe(6);
  });

  it('should have links', () => {
    let link = fixture.debugElement.queryAll(By.css('a'))
    expect(link.length).toBe(6);
  });

});
