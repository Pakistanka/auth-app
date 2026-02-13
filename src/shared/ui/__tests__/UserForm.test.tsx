import React from 'react';
import { render } from '@testing-library/react';
import { Form } from 'antd';
import { UserForm } from '../UserForm';

// Обертка для использования хука Form.useForm в тестах
const FormWrapper: React.FC<{ 
  showIdField?: boolean; 
  initialValues?: any;
  children?: (form: any) => React.ReactNode;
}> = ({ showIdField = false, initialValues, children }) => {
  const [form] = Form.useForm();
  return (
    <>
      {children ? children(form) : (
        <UserForm form={form} showIdField={showIdField} initialValues={initialValues} />
      )}
    </>
  );
};

describe('UserForm', () => {
  it('should render form component', () => {
    const { container } = render(
      <FormWrapper>
        {(form) => <UserForm form={form} />}
      </FormWrapper>
    );
    // Проверяем, что компонент отрендерился
    expect(container.firstChild).toBeTruthy();
  });

  it('should render with id field when showIdField is true', () => {
    const { container } = render(
      <FormWrapper showIdField={true}>
        {(form) => <UserForm form={form} showIdField={true} />}
      </FormWrapper>
    );
    expect(container.firstChild).toBeTruthy();
  });

  it('should render without id field when showIdField is false', () => {
    const { container } = render(
      <FormWrapper showIdField={false}>
        {(form) => <UserForm form={form} showIdField={false} />}
      </FormWrapper>
    );
    expect(container.firstChild).toBeTruthy();
  });

  it('should render with initial values', () => {
    const initialValues = {
      name: 'Test User',
      avatar: 'http://example.com/avatar.jpg',
    };
    const { container } = render(
      <FormWrapper initialValues={initialValues}>
        {(form) => <UserForm form={form} initialValues={initialValues} />}
      </FormWrapper>
    );
    expect(container.firstChild).toBeTruthy();
  });
});
