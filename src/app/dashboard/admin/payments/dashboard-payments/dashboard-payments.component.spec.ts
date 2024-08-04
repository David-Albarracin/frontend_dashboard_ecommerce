import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPaymentsComponent } from './dashboard-payments.component';

describe('DashboardPaymentsComponent', () => {
  let component: DashboardPaymentsComponent;
  let fixture: ComponentFixture<DashboardPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardPaymentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
