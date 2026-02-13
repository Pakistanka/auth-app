import React, { useEffect } from 'react';
import { Modal, Form, Button, notification } from 'antd';
import { useUpdateUser } from '@/entities/user/model/useUpdateUser';
import { useDeleteUser } from '@/entities/user/model/useDeleteUser';
import { User, UpdateUserDto } from '@/shared/types/user';
import { UserForm } from '@/shared/ui/UserForm';

interface EditUserModalProps {
  open: boolean;
  user: User | null;
  onCancel: () => void;
}

export const EditUserModal: React.FC<EditUserModalProps> = ({
  open,
  user,
  onCancel,
}) => {
  const [form] = Form.useForm();
  const updateUserMutation = useUpdateUser();
  const deleteUserMutation = useDeleteUser();

  useEffect(() => {
    if (user && open) {
      form.setFieldsValue({
        id: user.id,
        name: user.name,
        avatar: user.avatar,
      });
    }
  }, [user, open, form]);

  const handleSubmit = async () => {
    if (!user) return;

    try {
      const values = await form.validateFields();
      const { id, ...updateData } = values;
      await updateUserMutation.mutateAsync({
        id: user.id,
        data: updateData as UpdateUserDto,
      });
      form.resetFields();
      notification.success({
        message: 'Пользователь обновлен',
        description: 'Данные пользователя успешно сохранены',
      });
      onCancel();
    } catch (error: any) {
      if (error?.errorFields) {
        return;
      }
    }
  };

  const handleDelete = async () => {
    if (!user) return;

    try {
      await deleteUserMutation.mutateAsync(user.id);
      form.resetFields();
      notification.success({
        message: 'Пользователь удален',
        description: 'Пользователь успешно удален из системы',
      });
      onCancel();
    } catch (error: any) {
      // Ошибки API обрабатываются в хуке useDeleteUser через onError
      // Здесь ничего не делаем, так как ошибка уже обработана
    }
  };

  const handleCancel = () => {
    if (!updateUserMutation.isPending && !deleteUserMutation.isPending) {
      form.resetFields();
      onCancel();
    }
  };

  const isLoading = updateUserMutation.isPending || deleteUserMutation.isPending;

  return (
    <Modal
      title="Редактирование пользователя"
      open={open}
      onCancel={handleCancel}
      maskClosable={!isLoading}
      footer={[
        <Button
          key="delete"
          danger
          type="primary"
          onClick={handleDelete}
          loading={deleteUserMutation.isPending}
          disabled={updateUserMutation.isPending}
        >
          Удалить
        </Button>,
        <Button
          key="cancel"
          onClick={handleCancel}
          disabled={isLoading}
        >
          Отмена
        </Button>,
        <Button
          key="save"
          type="primary"
          onClick={handleSubmit}
          loading={updateUserMutation.isPending}
          disabled={deleteUserMutation.isPending}
        >
          Сохранить
        </Button>,
      ]}
    >
      <UserForm form={form} showIdField={true} />
    </Modal>
  );
};
