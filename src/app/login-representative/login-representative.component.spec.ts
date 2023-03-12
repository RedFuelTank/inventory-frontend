import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRepresentativeComponent } from './login-representative.component';

describe('LoginComponent', () => {
  let component: LoginRepresentativeComponent;
  let fixture: ComponentFixture<LoginRepresentativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginRepresentativeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginRepresentativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
