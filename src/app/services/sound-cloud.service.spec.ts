/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SoundCloudService } from './sound-cloud.service';

describe('Service: SoundCloud', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SoundCloudService]
    });
  });

  it('should ...', inject([SoundCloudService], (service: SoundCloudService) => {
    expect(service).toBeTruthy();
  }));
});
