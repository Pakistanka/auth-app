import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notification } from 'antd';
import { userService } from '../lib/userService';
import { UpdateUserDto } from '@/shared/types/user';

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserDto }) =>
      userService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['users', 'infinite'] });
    },
    onError: (error: any) => {
      notification.error({
        message: 'Ошибка обновления пользователя',
        description: error?.response?.data?.message || error?.message || 'Не удалось обновить данные пользователя',
      });
    },
  });
};
