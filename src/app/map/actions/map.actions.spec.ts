import * as fromMap from './map.actions';

describe('MapActions', () => {
  describe('loadMaps', () => {
    it('should return an action', () => {
      expect(fromMap.loadListings().type).toBe('[Map] Load Listings');
    });
  });
});
