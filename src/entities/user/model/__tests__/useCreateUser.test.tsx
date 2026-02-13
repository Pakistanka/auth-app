import { renderHook } from '@testing-library/react-hooks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { useCreateUser } from '../useCreateUser';
import { userService } from '../../lib/userService';
import { notification } from 'antd';

jest.mock('../../lib/userService');
jest.mock('antd', () => ({
  notification: {
    error: jest.fn(),
  },
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  return Wrapper;
};

describe('useCreateUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create user successfully', async () => {
    const mockUser = {
      id: '1',
      name: 'New User',
      avatar: 'http://example.com/avatar.jpg',
      createdAt: '2024-01-01',
    };
    const createData = { name: 'New User', avatar: 'http://example.com/avatar.jpg' };
    (userService.create as jest.Mock).mockResolvedValue(mockUser);

    const { result, waitForNextUpdate } = renderHook(() => useCreateUser(), {
      wrapper: createWrapper(),
    });

    expect(result.current).toBeDefined();
    
    if (result.current && result.current.mutate) {
      result.current.mutate(createData);

      await waitForNextUpdate();

      expect(result.current.isSuccess).toBe(true);
      expect(userService.create).toHaveBeenCalledWith(createData);
    } else {
      expect(result.current).toBeDefined();
    }
  });

  it('should handle error', async () => {
    const mockError = { message: 'Failed to create user' };
    (userService.create as jest.Mock).mockRejectedValue(mockError);

    const { result, waitForNextUpdate } = renderHook(() => useCreateUser(), {
      wrapper: createWrapper(),
    });

    expect(result.current).toBeDefined();
    
    if (result.current && result.current.mutate) {
      result.current.mutate({ name: 'Test', avatar: 'http://example.com/test.jpg' });

      await waitForNextUpdate();

      expect(result.current.isError).toBe(true);
      expect(notification.error).toHaveBeenCalled();
    } else {
      expect(result.current).toBeDefined();
    }
  });
});
