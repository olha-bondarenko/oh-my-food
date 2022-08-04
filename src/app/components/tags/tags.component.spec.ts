import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { FoodService } from 'src/app/services/food.service';
import { sample_tags } from 'src/data';

import { TagsComponent } from './tags.component';

describe('TagsComponent', () => {
  let component: TagsComponent;
  let fixture: ComponentFixture<TagsComponent>;

  beforeEach(async () => {
    const foodServiceSpy = jasmine.createSpyObj<FoodService>(['getAllTags']);
    foodServiceSpy.getAllTags.and.returnValue(of(sample_tags));
    await TestBed.configureTestingModule({
      declarations: [ TagsComponent ],
      providers: [{provide: FoodService, useValue: foodServiceSpy}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should include list of tags', () => {
    expect(component.tags?.length).toBe(8);
  });

  it('should display all tags', () => {
    let link = fixture.debugElement.queryAll(By.css('a'))
    expect(link.length).toBe(8);
  });
});
