import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notification } from 'antd';
import { userService } from '../lib/userService';
import { CreateUserDto } from '@/shared/types/user';

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUserDto) => userService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error: any) => {
      notification.error({
        message: 'Ошибка создания пользователя',
        description: error?.response?.data?.message || error?.message || 'Не удалось создать пользователя',
      });
    },
  });
};
