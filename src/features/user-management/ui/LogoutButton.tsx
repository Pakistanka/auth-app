import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { authUtils } from '@/shared/utils/auth';
import { ButtonContainer } from '@/shared/ui/ButtonContainer';

export const LogoutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    authUtils.removeToken();
    navigate('/login');
  };

  return (
    <ButtonContainer align="flex-end">
      <Button type="primary" onClick={handleLogout}>
        Выход
      </Button>
    </ButtonContainer>
  );
};
