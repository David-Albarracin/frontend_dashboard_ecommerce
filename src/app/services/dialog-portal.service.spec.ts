import { TestBed } from '@angular/core/testing';

import { DialogPortalService } from './dialog-portal.service';

describe('DialogPortalService', () => {
  let service: DialogPortalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogPortalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
