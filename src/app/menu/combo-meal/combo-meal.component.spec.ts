import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboMealComponent } from '@src/app/menu/combo-meal/combo-meal.component';

describe('ComboMealComponent', () => {
  let component: ComboMealComponent;
  let fixture: ComponentFixture<ComboMealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComboMealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComboMealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
