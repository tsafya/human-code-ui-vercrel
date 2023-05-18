import { TestBed } from '@angular/core/testing';

import { NameCodesService } from './name-codes.service';

describe('NameCodesService', () => {
  let service: NameCodesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NameCodesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
