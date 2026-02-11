import React from 'react';
import { Form, Input, Button } from 'antd';
import { useLogin } from '@/features/auth/model/useLogin';
import { LoginContainer } from './LoginContainer';

export const LoginForm: React.FC = () => {
  const [form] = Form.useForm();
  const loginMutation = useLogin();

  const onFinish = (values: { login: string; password: string }) => {
    loginMutation.mutate({
      login: values.login,
      password: values.password,
    });
  };

  return (
    <LoginContainer>
      <h1>Авторизация</h1>
      <Form
        form={form}
        name="login"
        onFinish={onFinish}
        layout="vertical"
        autoComplete="off"
      >
        <Form.Item
          label="Логин"
          name="login"
          rules={[{ required: true, message: 'Введите логин' }]}
        >
          <Input placeholder="Логин" />
        </Form.Item>

        <Form.Item
          label="Пароль"
          name="password"
          rules={[{ required: true, message: 'Введите пароль' }]}
        >
          <Input.Password placeholder="Пароль" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loginMutation.isPending}
            style={{ float: 'right' }}
          >
            Войти
          </Button>
        </Form.Item>
      </Form>
    </LoginContainer>
  );
};
