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
    // this will only work on a machine with nats nk tool installed.
    // may not be a good unit test run outside of devcontainer...¯\_(ツ)_/¯
    const result: NkResult = await nk();
    expect(result.accountName).toBeTruthy();
    expect(result.password).toBeTruthy();
  });
});
