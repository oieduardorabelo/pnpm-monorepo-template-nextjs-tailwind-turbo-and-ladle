import { useMutation } from 'react-query';

import {
  login,
  type LoginRequestParams,
  type LoginResponseResolve,
  type LoginResponseReject,
  signup,
  type SignupRequestParams,
  type SignupResponseReject,
  type SignupResponseResolve,
} from '~/repos/auth';

export * from '~/repos/auth';

export function useLoginMutation() {
  return useMutation<LoginResponseResolve, LoginResponseReject, LoginRequestParams>(
    'useLoginMutation',
    (payload: LoginRequestParams) => {
      return new Promise<LoginResponseResolve>((res) => {
        setTimeout(() => {
          res(login(payload));
        }, 1500);
      });
    }
  );
}

export function useSignupMutation() {
  return useMutation<SignupResponseResolve, SignupResponseReject, SignupRequestParams>(
    'useSignupMutation',
    (payload: SignupRequestParams) => {
      return new Promise<SignupResponseResolve>((res) => {
        setTimeout(() => {
          res(signup(payload));
        }, 1500);
      });
    }
  );
}
