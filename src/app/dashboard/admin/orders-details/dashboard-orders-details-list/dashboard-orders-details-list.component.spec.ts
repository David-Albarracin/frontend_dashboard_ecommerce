import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardOrdersDetailsListComponent } from './dashboard-orders-details-list.component';

describe('DashboardOrdersDetailsListComponent', () => {
  let component: DashboardOrdersDetailsListComponent;
  let fixture: ComponentFixture<DashboardOrdersDetailsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardOrdersDetailsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardOrdersDetailsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
