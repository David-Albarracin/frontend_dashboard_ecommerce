import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAddressesComponent } from './dashboard-addresses.component';

describe('DashboardAddressesComponent', () => {
  let component: DashboardAddressesComponent;
  let fixture: ComponentFixture<DashboardAddressesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardAddressesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardAddressesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
