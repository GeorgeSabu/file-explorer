import { TestBed } from '@angular/core/testing';

import { PathService } from './path.service';

describe('FileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PathService = TestBed.get(PathService);
    expect(service).toBeTruthy();
  });
});
