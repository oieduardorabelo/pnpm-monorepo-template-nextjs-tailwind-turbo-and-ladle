import { useEffect, useState } from 'react';
import { useLocalStorage, writeStorage, deleteFromStorage } from '@rehooks/local-storage';

export { writeStorage, deleteFromStorage };

export function useStorage<T>(key: string) {
  const [_storage] = useLocalStorage<T>(key);
  const [state, setState] = useState<T | null>(null);

  useEffect(() => {
    setState(_storage);
  }, [_storage]);

  return state;
}
