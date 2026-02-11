import { apiClient } from '@/shared/lib/axios';
import { User, CreateUserDto } from '@/shared/types/user';

export const createUser = async (data: CreateUserDto): Promise<User> => {
  const response = await apiClient.post<User>('/users', data);
  return response.data;
};
