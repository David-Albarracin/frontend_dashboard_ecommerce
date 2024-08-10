import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPhonesComponent } from './dashboard-phones.component';

describe('DashboardPhonesComponent', () => {
  let component: DashboardPhonesComponent;
  let fixture: ComponentFixture<DashboardPhonesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardPhonesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardPhonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
