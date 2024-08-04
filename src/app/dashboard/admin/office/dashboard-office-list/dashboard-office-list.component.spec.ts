import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardOfficeListComponent } from './dashboard-office-list.component';

describe('DashboardOfficeListComponent', () => {
  let component: DashboardOfficeListComponent;
  let fixture: ComponentFixture<DashboardOfficeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardOfficeListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardOfficeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
