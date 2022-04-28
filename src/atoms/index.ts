import { atom } from 'recoil';

export const auth_token = atom({
  key: 'auth_token',
  default: '',
});
