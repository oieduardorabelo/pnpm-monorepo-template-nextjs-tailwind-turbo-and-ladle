import { mockdb, createUser } from './user';

export type LoginRequestParams = {
  email: string;
  password: string;
  remember: boolean;
};
export type LoginResponseReject = {
  ok: boolean;
  message: string;
  fields: Record<string, string>;
};
export type LoginResponseResolve = {
  ok: boolean;
  results: {
    id: string;
    email: string;
  };
};
export async function login(payload: LoginRequestParams) {
  if (!payload.email) {
    return Promise.reject({ ok: false, message: 'Wrong input', fields: { email: 'Email is required' } });
  }
  if (!payload.password) {
    return Promise.reject({ ok: false, message: 'Wrong input', fields: { password: 'Password is required' } });
  }
  if (payload.password.length < 3) {
    return Promise.reject({ ok: false, message: 'Wrong input', fields: { password: 'Password is too short' } });
  }
  const user = await mockdb.findUser(payload.email, payload.password);
  if (!user) {
    return Promise.reject({
      ok: false,
      message: 'Invalid credentials',
      fields: { email: 'Email is invalid', password: 'Password is invalid' },
    });
  }

  //
  // TODO: Apply remembe me when creating backend session
  // setCookie('user', req.results, {
  //   maxAge: payload.remember
  //     ? 60 * 60 * 24 * 7 // 7 days
  //     : undefined,
  // });
  //

  const { password: _p, ...results } = user;
  return Promise.resolve({ ok: true, results });
}

export type SignupRequestParams = {
  email: string;
  password: string;
};
export type SignupResponseReject = {
  ok: boolean;
  message: string;
  fields: Record<string, string>;
};
export type SignupResponseResolve = {
  ok: boolean;
  results: {
    id: string;
    email: string;
  };
};
export async function signup(payload: SignupRequestParams) {
  if (!payload.email) {
    return Promise.reject({ ok: false, message: 'Wrong input', fields: { email: 'Email is required' } });
  }
  if (!payload.password) {
    return Promise.reject({ ok: false, message: 'Wrong input', fields: { password: 'Password is required' } });
  }
  if (payload.password.length < 3) {
    return Promise.reject({ ok: false, message: 'Wrong input', fields: { password: 'Password is too short' } });
  }

  const user = await createUser(payload);
  const { password: _p, ...results } = user;
  return Promise.resolve({ ok: true, results });
}
