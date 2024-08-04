import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEmployeeListComponent } from './dashboard-employee-list.component';

describe('DashboardEmployeeListComponent', () => {
  let component: DashboardEmployeeListComponent;
  let fixture: ComponentFixture<DashboardEmployeeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardEmployeeListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardEmployeeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
