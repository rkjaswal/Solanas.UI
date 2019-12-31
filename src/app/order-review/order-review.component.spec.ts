import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderReviewComponent } from '@src/app/order-review/order-review.component';

describe('OrderReviewComponent', () => {
  let component: OrderReviewComponent;
  let fixture: ComponentFixture<OrderReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
