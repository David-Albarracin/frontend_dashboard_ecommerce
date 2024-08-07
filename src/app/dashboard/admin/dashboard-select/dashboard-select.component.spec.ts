import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSelectComponent } from './dashboard-select.component';

describe('DashboardSelectComponent', () => {
  let component: DashboardSelectComponent;
  let fixture: ComponentFixture<DashboardSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
