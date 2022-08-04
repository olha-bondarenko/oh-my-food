import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { sample_order } from 'src/data';
import { OrderItemsListComponent } from './order-items-list.component';

describe('OrderItemsListComponent', () => {
  let component: OrderItemsListComponent;
  let fixture: ComponentFixture<OrderItemsListComponent>;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderItemsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderItemsListComponent);
    component = fixture.componentInstance;
    component.order = sample_order;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should have an order input', () => {
    expect(component.order.items.length).toBe(1);
  });

  it('should display all order items', () => {
    let link = fixture.debugElement.queryAll(By.css('.item-card'))
    expect(link.length).toBe(1);
  });

  it('h3 should display the title', () => {
    const h3Element: HTMLElement = fixture.nativeElement;
    expect(h3Element.textContent).toContain('Order Items:');
  });
});
