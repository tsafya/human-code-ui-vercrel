import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculateNameCodeDialogComponent } from './calculate-name-code-dialog.component';

describe('CalculateNameCodeDialogComponent', () => {
  let component: CalculateNameCodeDialogComponent;
  let fixture: ComponentFixture<CalculateNameCodeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculateNameCodeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculateNameCodeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
