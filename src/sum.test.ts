import { expect, test } from 'vitest';
import { sum } from './sum';

test('adding value 1 to 2 equal', () => {
  expect(sum(1, 2));
});
