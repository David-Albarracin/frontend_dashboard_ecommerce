import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCustomersListComponent } from './dashboard-customers-list.component';

describe('DashboardCustomersListComponent', () => {
  let component: DashboardCustomersListComponent;
  let fixture: ComponentFixture<DashboardCustomersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardCustomersListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardCustomersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
