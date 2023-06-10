import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissingNamesComponent } from './missing-names.component';

describe('MissingNamesComponent', () => {
  let component: MissingNamesComponent;
  let fixture: ComponentFixture<MissingNamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MissingNamesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MissingNamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
