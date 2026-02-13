import { userService } from '../userService';
import { getUsers } from '../../api/getUsers';
import { createUser } from '../../api/createUser';
import { updateUser } from '../../api/updateUser';
import { deleteUser } from '../../api/deleteUser';

jest.mock('../../api/getUsers');
jest.mock('../../api/createUser');
jest.mock('../../api/updateUser');
jest.mock('../../api/deleteUser');

describe('userService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('should call getUsers without params', async () => {
      const mockUsers = [
        { id: '1', name: 'User 1', avatar: 'http://example.com/1.jpg', createdAt: '2024-01-01' },
      ];
      (getUsers as jest.Mock).mockResolvedValue(mockUsers);

      const result = await userService.getAll();

      expect(getUsers).toHaveBeenCalledWith(undefined);
      expect(result).toEqual(mockUsers);
    });

    it('should call getUsers with params', async () => {
      const mockUsers = [
        { id: '1', name: 'User 1', avatar: 'http://example.com/1.jpg', createdAt: '2024-01-01' },
      ];
      (getUsers as jest.Mock).mockResolvedValue(mockUsers);

      const params = { page: 1, limit: 10 };
      const result = await userService.getAll(params);

      expect(getUsers).toHaveBeenCalledWith(params);
      expect(result).toEqual(mockUsers);
    });
  });

  describe('create', () => {
    it('should call createUser with data', async () => {
      const mockUser = {
        id: '1',
        name: 'New User',
        avatar: 'http://example.com/avatar.jpg',
        createdAt: '2024-01-01',
      };
      const createData = { name: 'New User', avatar: 'http://example.com/avatar.jpg' };
      (createUser as jest.Mock).mockResolvedValue(mockUser);

      const result = await userService.create(createData);

      expect(createUser).toHaveBeenCalledWith(createData);
      expect(result).toEqual(mockUser);
    });
  });

  describe('update', () => {
    it('should call updateUser with id and data', async () => {
      const mockUser = {
        id: '1',
        name: 'Updated User',
        avatar: 'http://example.com/new-avatar.jpg',
        createdAt: '2024-01-01',
      };
      const updateData = { name: 'Updated User', avatar: 'http://example.com/new-avatar.jpg' };
      (updateUser as jest.Mock).mockResolvedValue(mockUser);

      const result = await userService.update('1', updateData);

      expect(updateUser).toHaveBeenCalledWith('1', updateData);
      expect(result).toEqual(mockUser);
    });
  });

  describe('remove', () => {
    it('should call deleteUser with id', async () => {
      (deleteUser as jest.Mock).mockResolvedValue(undefined);

      await userService.remove('1');

      expect(deleteUser).toHaveBeenCalledWith('1');
    });
  });
});
