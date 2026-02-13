import { getUsers, GetUsersParams } from '../api/getUsers';
import { createUser } from '../api/createUser';
import { updateUser } from '../api/updateUser';
import { deleteUser } from '../api/deleteUser';
import { User, CreateUserDto, UpdateUserDto } from '@/shared/types/user';

/**
 * Сервис для работы с пользователями
 * Инкапсулирует все операции с API
 */
export const userService = {
  /**
   * Получить список всех пользователей
   */
  getAll: async (params?: GetUsersParams): Promise<User[]> => {
    return getUsers(params);
  },

  /**
   * Создать нового пользователя
   */
  create: async (data: CreateUserDto): Promise<User> => {
    return createUser(data);
  },

  /**
   * Обновить пользователя
   */
  update: async (id: string, data: UpdateUserDto): Promise<User> => {
    return updateUser(id, data);
  },

  /**
   * Удалить пользователя
   */
  remove: async (id: string): Promise<void> => {
    return deleteUser(id);
  },
};
