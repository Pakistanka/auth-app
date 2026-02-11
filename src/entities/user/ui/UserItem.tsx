import React from 'react';
import { Avatar } from 'antd';
import { User } from '@/shared/types/user';
import { formatDate } from '@/shared/utils/date';
import { UserItemContainer } from './UserItemContainer';

interface UserItemProps {
  user: User;
  onClick: (user: User) => void;
}

export const UserItem: React.FC<UserItemProps> = ({ user, onClick }) => {
  return (
    <UserItemContainer onClick={() => onClick(user)}>
      <Avatar src={user.avatar} size={40} />
      <div className="user-info">
        <div className="user-name">{user.name}</div>
        <div className="user-date">Зарегистрирован {formatDate(user.createdAt)}</div>
      </div>
    </UserItemContainer>
  );
};
