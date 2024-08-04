import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardUploadImageComponent } from './dashboard-upload-image.component';

describe('DashboardUploadImageComponent', () => {
  let component: DashboardUploadImageComponent;
  let fixture: ComponentFixture<DashboardUploadImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardUploadImageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardUploadImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
