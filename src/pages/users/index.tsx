import React, { useState, useMemo } from 'react';
import { Spin } from 'antd';
import { useInfiniteUsers } from '@/entities/user/model/useInfiniteUsers';
import { UserList } from '@/entities/user/ui/UserList';
import { User } from '@/shared/types/user';
import { LogoutButton } from '@/features/user-management/ui/LogoutButton';
import { CreateUserButton } from '@/features/user-management/ui/CreateUserButton';
import { CreateUserModal } from '@/features/user-management/ui/CreateUserModal';
import { EditUserModal } from '@/features/user-management/ui/EditUserModal';
import { UsersPageContainer } from './ui/UsersPageContainer';

export const UsersPage: React.FC = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteUsers();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Объединяем все страницы в один массив пользователей
  const users = useMemo(() => {
    return data?.pages.flatMap((page) => page) || [];
  }, [data]);

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleCreateClick = () => {
    setIsCreateModalOpen(true);
  };

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
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
      {users.length > 0 && (
        <UserList
          users={users}
          onUserClick={handleUserClick}
          onLoadMore={handleLoadMore}
          hasMore={hasNextPage}
          isLoadingMore={isFetchingNextPage}
        />
      )}
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
