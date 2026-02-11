import React from 'react';
import { Button } from 'antd';
import { CreateUserButtonContainer } from './CreateUserButtonContainer';

interface CreateUserButtonProps {
  onClick: () => void;
}

export const CreateUserButton: React.FC<CreateUserButtonProps> = ({
  onClick,
}) => {
  return (
    <CreateUserButtonContainer>
      <Button type="primary" onClick={onClick}>
        Создать пользователя
      </Button>
    </CreateUserButtonContainer>
  );
};
