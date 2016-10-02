/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TracksParserService } from './tracks-parser.service';

describe('Service: TracksParser', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TracksParserService]
    });
  });

  it('should ...', inject([TracksParserService], (service: TracksParserService) => {
    expect(service).toBeTruthy();
  }));
});
