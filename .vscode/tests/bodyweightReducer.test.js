import bodyweightReducer from '../src/redux/reducers/bodyweightReducer'


test('Reducer returns default state if state is undefined', () => {
  const result = bodyweightReducer(undefined, {});
  expect(typeof (result)).toBe(typeof ([]));
  expect(result.length).toBe(0);
});
