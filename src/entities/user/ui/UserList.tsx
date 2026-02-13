import React, { useEffect, useRef } from 'react';
import { Spin } from 'antd';
import { User } from '@/shared/types/user';
import { UserItem } from './UserItem';
import { UserListContainer } from './UserListContainer';
import { LoadMoreTrigger } from './LoadMoreTrigger';

interface UserListProps {
  users: User[];
  onUserClick: (user: User) => void;
  onLoadMore?: () => void;
  hasMore?: boolean;
  isLoadingMore?: boolean;
}

export const UserList: React.FC<UserListProps> = ({
  users,
  onUserClick,
  onLoadMore,
  hasMore = false,
  isLoadingMore = false,
}) => {
  const loadMoreTriggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!onLoadMore || !hasMore || isLoadingMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px',
      }
    );

    const currentRef = loadMoreTriggerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [onLoadMore, hasMore, isLoadingMore]);

  return (
    <UserListContainer>
      {users.map((user) => (
        <UserItem key={user.id} user={user} onClick={onUserClick} />
      ))}
      {hasMore && (
        <LoadMoreTrigger ref={loadMoreTriggerRef}>
          {isLoadingMore && (
            <Spin size="small" style={{ display: 'block', margin: '20px auto' }} />
          )}
        </LoadMoreTrigger>
      )}
    </UserListContainer>
  );
};
