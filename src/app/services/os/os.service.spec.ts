import { TestBed } from '@angular/core/testing';

import { OsService } from './os.service';

describe('OsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OsService = TestBed.get(OsService);
    expect(service).toBeTruthy();
  });
});
