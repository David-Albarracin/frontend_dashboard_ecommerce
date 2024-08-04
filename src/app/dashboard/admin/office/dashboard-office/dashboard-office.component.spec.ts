import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardOfficeComponent } from './dashboard-office.component';

describe('DashboardOfficeComponent', () => {
  let component: DashboardOfficeComponent;
  let fixture: ComponentFixture<DashboardOfficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardOfficeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
