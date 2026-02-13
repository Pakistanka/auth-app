import { apiClient } from '@/shared/lib/axios';
import { User } from '@/shared/types/user';

export interface GetUsersParams {
  page?: number;
  limit?: number;
}

export const getUsers = async (params?: GetUsersParams): Promise<User[]> => {
  const queryParams = new URLSearchParams();
  if (params?.page) {
    queryParams.append('page', params.page.toString());
  }
  if (params?.limit) {
    queryParams.append('limit', params.limit.toString());
  }
  
  const queryString = queryParams.toString();
  const url = `/users${queryString ? `?${queryString}` : ''}`;
  
  const response = await apiClient.get<User[]>(url);
  return response.data;
};
