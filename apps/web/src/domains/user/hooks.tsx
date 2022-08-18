import { useQuery, UseQueryOptions } from 'react-query';

import { mockdb, UserNoPassword } from '~/repos/user';

export function useUsersQuery(
  options?: Omit<UseQueryOptions<unknown, unknown, UserNoPassword[], string[]>, 'queryKey' | 'queryFn'> | undefined
) {
  return useQuery<unknown, unknown, UserNoPassword[], string[]>(
    ['useUsersQuery'],
    () => {
      return mockdb.getUsers();
    },
    options
  );
}
