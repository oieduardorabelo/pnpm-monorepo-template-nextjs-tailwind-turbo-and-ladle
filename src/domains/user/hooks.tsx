import { useMutation } from 'react-query';

import { createUser, type User } from '~/repos/user';

export function useUserCreateMutation() {
  return useMutation((newUser: User) => {
    return createUser(newUser);
  });
}
