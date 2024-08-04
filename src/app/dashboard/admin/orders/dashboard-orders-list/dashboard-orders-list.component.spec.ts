import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardOrdersListComponent } from './dashboard-orders-list.component';

describe('DashboardOrdersListComponent', () => {
  let component: DashboardOrdersListComponent;
  let fixture: ComponentFixture<DashboardOrdersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardOrdersListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardOrdersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
