import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardOrdersDetailsComponent } from './dashboard-orders-details.component';

describe('DashboardOrdersDetailsComponent', () => {
  let component: DashboardOrdersDetailsComponent;
  let fixture: ComponentFixture<DashboardOrdersDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardOrdersDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardOrdersDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
