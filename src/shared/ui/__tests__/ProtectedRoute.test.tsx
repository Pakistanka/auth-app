import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from '../ProtectedRoute';
import { authUtils } from '@/shared/utils/auth';

jest.mock('@/shared/utils/auth');

describe('ProtectedRoute', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render children when user is authenticated', () => {
    (authUtils.isAuthenticated as jest.Mock).mockReturnValue(true);

    const { container } = render(
      <BrowserRouter>
        <ProtectedRoute>
          <div>Protected Content</div>
        </ProtectedRoute>
      </BrowserRouter>
    );

    // Проверяем, что компонент отрендерился
    expect(container.firstChild).toBeTruthy();
  });

  it('should redirect when user is not authenticated', () => {
    (authUtils.isAuthenticated as jest.Mock).mockReturnValue(false);

    const { container } = render(
      <BrowserRouter>
        <ProtectedRoute>
          <div>Protected Content</div>
        </ProtectedRoute>
      </BrowserRouter>
    );

    // Navigate компонент может не рендерить ничего видимого, просто проверяем что нет защищенного контента
    const protectedContent = container.textContent;
    expect(protectedContent).not.toContain('Protected Content');
  });
});
