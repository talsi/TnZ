/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TracksStoreService } from './tracks-store.service';

describe('Service: TracksStore', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TracksStoreService]
    });
  });

  it('should ...', inject([TracksStoreService], (service: TracksStoreService) => {
    expect(service).toBeTruthy();
  }));
});
