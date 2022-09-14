import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculateCodeComponent } from './calculate-code.component';

describe('CalculateCodeComponent', () => {
  let component: CalculateCodeComponent;
  let fixture: ComponentFixture<CalculateCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculateCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculateCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
