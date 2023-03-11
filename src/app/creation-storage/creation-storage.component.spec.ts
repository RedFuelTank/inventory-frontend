import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationStorageComponent } from './creation-storage.component';

describe('CreationStorageComponent', () => {
  let component: CreationStorageComponent;
  let fixture: ComponentFixture<CreationStorageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreationStorageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreationStorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
