export interface LoginCredentials {
  login: string;
  password: string;
}

export const loginApi = async (
  credentials: LoginCredentials
): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (credentials.login === 'admin' && credentials.password === 'admin') {
        resolve('mock_token_' + Date.now());
      } else {
        reject(new Error('Неверный логин или пароль'));
      }
    }, 2000);
  });
};
