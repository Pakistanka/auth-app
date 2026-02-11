import React from 'react';
import { Modal, Form, Button, notification } from 'antd';
import { useCreateUser } from '@/entities/user/model/useCreateUser';
import { CreateUserDto } from '@/shared/types/user';
import { UserForm } from '@/shared/ui/UserForm';

interface CreateUserModalProps {
  open: boolean;
  onCancel: () => void;
}

export const CreateUserModal: React.FC<CreateUserModalProps> = ({
  open,
  onCancel,
}) => {
  const [form] = Form.useForm();
  const createUserMutation = useCreateUser();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      await createUserMutation.mutateAsync(values as CreateUserDto);
      form.resetFields();
      notification.success({
        message: 'Пользователь создан',
        description: 'Пользователь успешно добавлен в систему',
      });
      onCancel();
    } catch (error: any) {
      // Ошибки валидации формы обрабатываются автоматически Ant Design Form
      // Ошибки API обрабатываются в хуке useCreateUser через onError
      if (error?.errorFields) {
        // Это ошибка валидации формы - Ant Design Form покажет её автоматически
        return;
      }
      // Если это не ошибка валидации, но запрос не прошел - ошибка уже обработана в хуке
    }
  };

  const handleCancel = () => {
    if (!createUserMutation.isPending) {
      form.resetFields();
      onCancel();
    }
  };

  return (
    <Modal
      title="Создание пользователя"
      open={open}
      onCancel={handleCancel}
      maskClosable={!createUserMutation.isPending}
      footer={[
        <Button
          key="cancel"
          onClick={handleCancel}
          disabled={createUserMutation.isPending}
        >
          Отмена
        </Button>,
        <Button
          key="create"
          type="primary"
          onClick={handleSubmit}
          loading={createUserMutation.isPending}
        >
          Создать
        </Button>,
      ]}
    >
      <UserForm form={form} />
    </Modal>
  );
};
