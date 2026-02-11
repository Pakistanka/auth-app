import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { authUtils } from '@/shared/utils/auth';
import { LogoutButtonContainer } from './LogoutButtonContainer';

export const LogoutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    authUtils.removeToken();
    navigate('/login');
  };

  return (
    <LogoutButtonContainer>
      <Button type="primary" onClick={handleLogout}>
        Выход
      </Button>
    </LogoutButtonContainer>
  );
};
