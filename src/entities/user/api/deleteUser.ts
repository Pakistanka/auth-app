import { apiClient } from '@/shared/lib/axios';

export const deleteUser = async (id: string): Promise<void> => {
  await apiClient.delete(`/users/${id}`);
};
