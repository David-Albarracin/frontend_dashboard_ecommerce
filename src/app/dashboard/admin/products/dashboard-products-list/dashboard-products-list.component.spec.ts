import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardProductsListComponent } from './dashboard-products-list.component';

describe('DashboardProductsListComponent', () => {
  let component: DashboardProductsListComponent;
  let fixture: ComponentFixture<DashboardProductsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardProductsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardProductsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
