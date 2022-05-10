import { atom } from 'recoil';

export const auth_token = atom<string | undefined>({
  key: 'auth_token',
  default: '',
});
