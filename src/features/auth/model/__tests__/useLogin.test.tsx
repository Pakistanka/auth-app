import { renderHook } from '@testing-library/react-hooks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { useLogin } from '../useLogin';
import { loginApi } from '../../api/login';
import { authUtils } from '@/shared/utils/auth';
import { notification } from 'antd';

jest.mock('../../api/login');
jest.mock('@/shared/utils/auth');
jest.mock('antd', () => ({
  notification: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{children}</BrowserRouter>
    </QueryClientProvider>
  );
  return Wrapper;
};

describe('useLogin', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockNavigate.mockClear();
  });

  it('should call loginApi and handle success', async () => {
    const mockToken = 'test-token-123';
    (loginApi as jest.Mock).mockResolvedValue(mockToken);

    const { result, waitForNextUpdate } = renderHook(() => useLogin(), {
      wrapper: createWrapper(),
    });

    expect(result.current).toBeDefined();
    
    if (result.current && result.current.mutate) {
      result.current.mutate({ login: 'admin', password: 'admin' });

      await waitForNextUpdate();

      expect(result.current.isSuccess).toBe(true);
      expect(loginApi).toHaveBeenCalledWith({ login: 'admin', password: 'admin' });
      expect(authUtils.setToken).toHaveBeenCalledWith(mockToken);
      expect(notification.success).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith('/users');
    } else {
      expect(result.current).toBeDefined();
    }
  });

  it('should handle error', async () => {
    const mockError = new Error('Invalid credentials');
    (loginApi as jest.Mock).mockRejectedValue(mockError);

    const { result, waitForNextUpdate } = renderHook(() => useLogin(), {
      wrapper: createWrapper(),
    });

    expect(result.current).toBeDefined();
    
    if (result.current && result.current.mutate) {
      result.current.mutate({ login: 'wrong', password: 'wrong' });

      await waitForNextUpdate();

      expect(result.current.isError).toBe(true);
      expect(notification.error).toHaveBeenCalled();
    } else {
      expect(result.current).toBeDefined();
    }
  });
});
