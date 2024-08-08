import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardProductsCartComponent } from './dashboard-products-cart.component';

describe('DashboardProductsCartComponent', () => {
  let component: DashboardProductsCartComponent;
  let fixture: ComponentFixture<DashboardProductsCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardProductsCartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardProductsCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
