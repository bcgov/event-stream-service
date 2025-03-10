import axios from 'axios';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import AxiosMockAdapter from 'axios-mock-adapter';

import { GenerateCredentialsService } from '@/services';
import type { GeneratedCredentials } from '@/types';

const mockInstance = axios.create();
const mockAxios = new AxiosMockAdapter(mockInstance);

vi.mock('@/services/interceptors', () => {
  return {
    appAxios: () => mockInstance
  };
});

describe('Generate Credentials Service', () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  it('calls get successfully', async () => {
    const service = new GenerateCredentialsService();

    mockAxios.onGet('generateCredentials').reply(200, {
      accountName: 'account',
      password: 'password'
    });

    const result: GeneratedCredentials | null = await service.generateCredentials();
    expect(result).toBeTruthy();
    expect(result?.accountName).toBe('account');
    expect(result?.password).toBe('password');
  });

  it('calls get without authorization', async () => {
    const service = new GenerateCredentialsService();

    mockAxios.onGet('generateCredentials').reply(401);
    await expect(() => service.generateCredentials()).rejects.toThrowError();
  });

  it('calls get with error', async () => {
    const service = new GenerateCredentialsService();

    mockAxios.onGet('generateCredentials').reply(500);
    await expect(() => service.generateCredentials()).rejects.toThrowError();
  });
});
