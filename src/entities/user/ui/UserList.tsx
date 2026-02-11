import React from 'react';
import { User } from '@/shared/types/user';
import { UserItem } from './UserItem';
import { UserListContainer } from './UserListContainer';

interface UserListProps {
  users: User[];
  onUserClick: (user: User) => void;
}

export const UserList: React.FC<UserListProps> = ({ users, onUserClick }) => {
  return (
    <UserListContainer>
      {users.map((user) => (
        <UserItem key={user.id} user={user} onClick={onUserClick} />
      ))}
    </UserListContainer>
  );
};
