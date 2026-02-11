import React, { useState } from 'react';
import { Spin } from 'antd';
import { useUsers } from '@/entities/user/model/useUsers';
import { UserList } from '@/entities/user/ui/UserList';
import { User } from '@/shared/types/user';
import { LogoutButton } from '@/features/user-management/ui/LogoutButton';
import { CreateUserButton } from '@/features/user-management/ui/CreateUserButton';
import { CreateUserModal } from '@/features/user-management/ui/CreateUserModal';
import { EditUserModal } from '@/features/user-management/ui/EditUserModal';
import { UsersPageContainer } from './ui/UsersPageContainer';

export const UsersPage: React.FC = () => {
  const { data: users, isLoading } = useUsers();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleCreateClick = () => {
    setIsCreateModalOpen(true);
  };

  if (isLoading) {
    return (
      <UsersPageContainer>
        <Spin size="large" style={{ display: 'block', margin: '100px auto' }} />
      </UsersPageContainer>
    );
  }

  return (
    <UsersPageContainer>
      <LogoutButton />
      {users && <UserList users={users} onUserClick={handleUserClick} />}
      <CreateUserButton onClick={handleCreateClick} />
      <CreateUserModal
        open={isCreateModalOpen}
        onCancel={() => setIsCreateModalOpen(false)}
      />
      <EditUserModal
        open={isEditModalOpen}
        user={selectedUser}
        onCancel={() => {
          setIsEditModalOpen(false);
          setSelectedUser(null);
        }}
      />
    </UsersPageContainer>
  );
};
