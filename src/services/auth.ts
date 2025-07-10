import { NetworkHandlerMocked } from './core';

export const login = async (
  url: string,
  usernameOrEmail: string,
  password: string,
) => {
  try {
    const response = await NetworkHandlerMocked.post('login', {
      url,
      usernameOrEmail,
      password,
    });

    if (
      url === 'example.com' &&
      usernameOrEmail === 'john' &&
      password === '123456'
    ) {
      return [null, response?.data];
    }

    throw new Error('Invalid user');
  } catch (err) {
    return [err, null];
  }
};
