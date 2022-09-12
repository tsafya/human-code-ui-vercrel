import { TestBed } from '@angular/core/testing';

import { ImageSnippetService } from './image-snippet.service';

describe('ImageSnippetService', () => {
  let service: ImageSnippetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageSnippetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
