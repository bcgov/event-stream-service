import { nk } from '../../../src/components/commands';
import { NkResult } from '../../../src/types/NkResult';

beforeEach(() => {
  jest.resetAllMocks();
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe('nkeys tool', () => {
  it('should return accountName/password', async () => {
    const result: NkResult = await nk();
    expect(result.accountName).toBeTruthy();
    expect(result.password).toBeTruthy();
  });
});
