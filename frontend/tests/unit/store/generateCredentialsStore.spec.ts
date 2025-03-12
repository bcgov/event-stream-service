import { setActivePinia, createPinia } from 'pinia';

import { GenerateCredentialsService } from '@/services';
import { useGenerateCredentialsStore } from '@/store';
import type { StoreGeneric } from 'pinia';

import type { MockInstance } from 'vitest';

beforeEach(() => {
  setActivePinia(createPinia());

  vi.clearAllMocks();
});

afterEach(() => {});

describe('Config Store', () => {
  let service: GenerateCredentialsService;
  let store: StoreGeneric;

  let serviceGenerateCredentialsSpy: MockInstance;

  beforeEach(() => {
    service = new GenerateCredentialsService();
    store = useGenerateCredentialsStore();

    serviceGenerateCredentialsSpy = vi.spyOn(service, 'generateCredentials');
  });

  describe('generateCredentials', () => {
    it('sets state values', async () => {
      serviceGenerateCredentialsSpy.mockReturnValue({ accountName: 'account', password: 'password' });

      await store.generateCredentials();

      expect(serviceGenerateCredentialsSpy).toHaveBeenCalledTimes(1);
      expect(store.getCredentials).toStrictEqual({ accountName: 'account', password: 'password' });
      expect(store.getAccountName).toStrictEqual('account');
      expect(store.getPassword).toStrictEqual('password');
    });
    it('sets state values to null on error', async () => {
      serviceGenerateCredentialsSpy.mockRejectedValueOnce('some error');

      await store.generateCredentials();

      expect(serviceGenerateCredentialsSpy).toHaveBeenCalledTimes(1);
      expect(store.getCredentials).toStrictEqual(null);
      expect(store.getAccountName).toStrictEqual(null);
      expect(store.getPassword).toStrictEqual(null);
    });
  });
});
