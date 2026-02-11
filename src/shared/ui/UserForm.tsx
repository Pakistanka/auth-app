import React from 'react';
import { Form, Input } from 'antd';
import { CreateUserDto, UpdateUserDto } from '@/shared/types/user';

interface UserFormProps {
  form: any;
  initialValues?: CreateUserDto | UpdateUserDto;
  showIdField?: boolean;
}

export const UserForm: React.FC<UserFormProps> = ({
  form,
  initialValues,
  showIdField = false,
}) => {
  const validateUrl = (_: any, value: string) => {
    if (!value) {
      return Promise.reject(new Error('Введите ссылку на аватарку'));
    }
    try {
      new URL(value);
      return Promise.resolve();
    } catch {
      return Promise.reject(new Error('Введите корректный URL'));
    }
  };

  return (
    <Form form={form} layout="vertical" initialValues={initialValues}>
      {showIdField && (
        <Form.Item label="id" name="id">
          <Input disabled />
        </Form.Item>
      )}
      <Form.Item
        label="Имя"
        name="name"
        rules={[{ required: true, message: 'Введите имя' }]}
      >
        <Input placeholder="Имя" />
      </Form.Item>
      <Form.Item
        label="Ссылка на аватарку"
        name="avatar"
        rules={[{ validator: validateUrl }]}
      >
        <Input placeholder="Ссылка на аватарку" />
      </Form.Item>
    </Form>
  );
};
