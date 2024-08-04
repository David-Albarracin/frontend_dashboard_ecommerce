import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPaymentsListComponent } from './dashboard-payments-list.component';

describe('DashboardPaymentsListComponent', () => {
  let component: DashboardPaymentsListComponent;
  let fixture: ComponentFixture<DashboardPaymentsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardPaymentsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardPaymentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
