import { renderHook } from '@testing-library/react-hooks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { useUsers } from '../useUsers';
import { userService } from '../../lib/userService';

jest.mock('../../lib/userService');

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  return Wrapper;
};

describe('useUsers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch users successfully', async () => {
    const mockUsers = [
      {
        id: '1',
        name: 'User 1',
        avatar: 'http://example.com/1.jpg',
        createdAt: '2024-01-01',
      },
      {
        id: '2',
        name: 'User 2',
        avatar: 'http://example.com/2.jpg',
        createdAt: '2024-01-02',
      },
    ];
    (userService.getAll as jest.Mock).mockResolvedValue(mockUsers);

    const { result, waitForNextUpdate } = renderHook(() => useUsers(), {
      wrapper: createWrapper(),
    });

    // Проверяем, что хук возвращает результат
    expect(result.current).toBeDefined();
    
    // Ждем обновления хука
    await waitForNextUpdate();

    // Проверяем успешный результат
    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data).toEqual(mockUsers);
    expect(userService.getAll).toHaveBeenCalled();
  });

  it('should handle error', async () => {
    const mockError = new Error('Failed to fetch users');
    (userService.getAll as jest.Mock).mockRejectedValue(mockError);

    const { result, waitForNextUpdate } = renderHook(() => useUsers(), {
      wrapper: createWrapper(),
    });

    expect(result.current).toBeDefined();

    await waitForNextUpdate();

    expect(result.current.isError).toBe(true);
    expect(result.current.error).toEqual(mockError);
  });
});
