import * as fromMap from './map.actions';

describe('loadMaps', () => {
  it('should return an action', () => {
    expect(fromMap.loadListings().type).toBe('[Map] Load Listings');
  });
});
