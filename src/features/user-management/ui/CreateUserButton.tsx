import React from 'react';
import { Button } from 'antd';
import { ButtonContainer } from '@/shared/ui/ButtonContainer';

interface CreateUserButtonProps {
  onClick: () => void;
}

export const CreateUserButton: React.FC<CreateUserButtonProps> = ({
  onClick,
}) => {
  return (
    <ButtonContainer align="flex-start">
      <Button type="primary" onClick={onClick}>
        Создать пользователя
      </Button>
    </ButtonContainer>
  );
};
