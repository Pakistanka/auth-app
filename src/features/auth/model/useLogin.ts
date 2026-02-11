import { useMutation } from '@tanstack/react-query';
import { loginApi, LoginCredentials } from '../api/login';
import { authUtils } from '@/shared/utils/auth';
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => loginApi(credentials),
    onSuccess: (token: string) => {
      authUtils.setToken(token);
      notification.success({
        message: 'Успешная авторизация',
        description: 'Вы успешно вошли в систему',
      });
      navigate('/users');
    },
    onError: (error: Error) => {
      notification.error({
        message: 'Ошибка авторизации',
        description: error.message,
      });
    },
  });
};
