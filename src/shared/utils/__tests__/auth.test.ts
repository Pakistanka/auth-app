import { authUtils } from '../auth';

// Mock localStorage properly
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('authUtils', () => {
  beforeEach(() => {
    localStorageMock.clear();
    jest.clearAllMocks();
  });

  describe('getToken', () => {
    it('should return null when no token is stored', () => {
      expect(authUtils.getToken()).toBeNull();
    });

    it('should return token when token is stored', () => {
      localStorageMock.setItem('auth_token', 'test-token-123');
      expect(authUtils.getToken()).toBe('test-token-123');
    });
  });

  describe('setToken', () => {
    it('should store token in localStorage', () => {
      authUtils.setToken('new-token-456');
      expect(localStorageMock.setItem).toHaveBeenCalledWith('auth_token', 'new-token-456');
      expect(localStorageMock.getItem('auth_token')).toBe('new-token-456');
    });
  });

  describe('removeToken', () => {
    it('should remove token from localStorage', () => {
      localStorageMock.setItem('auth_token', 'token-to-remove');
      authUtils.removeToken();
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('auth_token');
    });
  });

  describe('isAuthenticated', () => {
    it('should return false when no token is stored', () => {
      expect(authUtils.isAuthenticated()).toBe(false);
    });

    it('should return true when token is stored', () => {
      localStorageMock.setItem('auth_token', 'any-token');
      expect(authUtils.isAuthenticated()).toBe(true);
    });
  });
});
