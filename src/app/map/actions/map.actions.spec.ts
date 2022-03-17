import * as fromMap from './map.actions';

describe('loadMaps', () => {
  it('should return an action', () => {
    expect(fromMap.loadMaps().type).toBe('[Map] Load Maps');
  });
});
