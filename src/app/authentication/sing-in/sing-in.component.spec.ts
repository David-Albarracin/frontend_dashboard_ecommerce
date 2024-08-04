import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingInComponent } from './sing-in.component';

describe('SingInComponent', () => {
  let component: SingInComponent;
  let fixture: ComponentFixture<SingInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingInComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
