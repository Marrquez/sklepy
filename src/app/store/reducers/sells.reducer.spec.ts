import { sellsReducer, initialState } from './sells.reducer';

describe('Sells Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = sellsReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
