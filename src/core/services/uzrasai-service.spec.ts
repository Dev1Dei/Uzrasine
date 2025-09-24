import { TestBed } from '@angular/core/testing';

import { UzrasaiService } from './uzrasai-service';

describe('UzrasaiService', () => {
  let service: UzrasaiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UzrasaiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
