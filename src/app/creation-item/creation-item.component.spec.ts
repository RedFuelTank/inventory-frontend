import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationItemComponent } from './creation-item.component';

describe('CreationItemComponent', () => {
  let component: CreationItemComponent;
  let fixture: ComponentFixture<CreationItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreationItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
