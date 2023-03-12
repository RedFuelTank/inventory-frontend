import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationRepresentativeComponent } from './registration-representative.component';

describe('RegistrationComponent', () => {
  let component: RegistrationRepresentativeComponent;
  let fixture: ComponentFixture<RegistrationRepresentativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationRepresentativeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationRepresentativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
