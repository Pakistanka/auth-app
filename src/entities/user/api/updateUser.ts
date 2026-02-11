import { apiClient } from '@/shared/lib/axios';
import { User, UpdateUserDto } from '@/shared/types/user';

export const updateUser = async (
  id: string,
  data: UpdateUserDto
): Promise<User> => {
  const response = await apiClient.put<User>(`/users/${id}`, data);
  return response.data;
};
