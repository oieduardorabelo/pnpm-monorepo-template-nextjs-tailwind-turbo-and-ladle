import { useEffect, useState } from 'react';
import { useLocalStorage, writeStorage, deleteFromStorage } from '@rehooks/local-storage';

export { writeStorage, deleteFromStorage, useLocalStorage };

export function useStorage<T>(key: string) {
  const [_storage] = useLocalStorage<T>(key);
  const [state, setState] = useState<{ isLoading: boolean; value: typeof _storage }>({ isLoading: true, value: null });

  useEffect(() => {
    setState({ isLoading: false, value: _storage });
  }, [_storage]);

  return state;
}

export function useFlashMessageStorage<T>(key: string) {
  const flashKey = `flash.${key}`;
  const [_storage] = useLocalStorage<T>(flashKey);
  const [message] = useState(_storage);

  useEffect(() => {
    deleteFromStorage(flashKey);
  }, [_storage, flashKey]);

  return message;
}

export function writeFlashMessage(key: string, message: string) {
  writeStorage(`flash.${key}`, message);
}
