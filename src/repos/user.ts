export const mockdb = {
  users: [{ id: 'zxcv', username: 'Doe', email: '123@123', password: '123' }] as User[],
  findUser(email: string, password: string) {
    const user = mockdb.users.find((item) => item.email === email && item.password === password);
    return Promise.resolve(user);
  },
};

export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
};

export type UserNoPassword = Omit<User, 'password'>;

export function createUser(payload: Omit<User, 'id'>) {
  const user = { ...payload, id: `${Math.random().toString(16).slice(2)}` };
  mockdb.users.push(user);
  return Promise.resolve(user);
}
