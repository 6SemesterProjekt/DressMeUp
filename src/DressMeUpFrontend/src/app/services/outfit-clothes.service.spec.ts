import { TestBed } from '@angular/core/testing';

import { OutfitClothesService } from './outfit-clothes.service';

describe('OutfitClothesService', () => {
  let service: OutfitClothesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OutfitClothesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
