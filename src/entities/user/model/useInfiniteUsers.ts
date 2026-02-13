import { useInfiniteQuery } from '@tanstack/react-query';
import { userService } from '../lib/userService';

const PAGE_SIZE = 10;

export const useInfiniteUsers = () => {
  return useInfiniteQuery({
    queryKey: ['users', 'infinite'],
    queryFn: ({ pageParam = 1 }) =>
      userService.getAll({ page: pageParam, limit: PAGE_SIZE }),
    getNextPageParam: (lastPage, allPages) => {
      // Если последняя страница содержит меньше элементов, чем PAGE_SIZE,
      // значит это последняя страница
      if (lastPage.length < PAGE_SIZE) {
        return undefined;
      }
      return allPages.length + 1;
    },
    initialPageParam: 1,
  });
};
