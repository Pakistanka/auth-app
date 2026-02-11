import { useQuery } from '@tanstack/react-query';
import { userService } from '../lib/userService';

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => userService.getAll(),
  });
};
