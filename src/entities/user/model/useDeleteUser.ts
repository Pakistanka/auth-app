import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notification } from 'antd';
import { userService } from '../lib/userService';

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => userService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error: any) => {
      notification.error({
        message: 'Ошибка удаления пользователя',
        description: error?.response?.data?.message || error?.message || 'Не удалось удалить пользователя',
      });
    },
  });
};
