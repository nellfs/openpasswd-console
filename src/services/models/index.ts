import {
  UserRegister,
  LoginRequest,
  ResponseToken,
} from './auth';

import {
  AccountGroups,
  AccountGroup,
  NewAccount,
  Accounts,
  AccountWithPasswordView,
  AccountView,
} from './account';


export class ResponseError {
  error: {
    [key: string]: string;
  };

  constructor(data: unknown) {
    this.error = {};
    if (typeof data === 'object' && data !== null && 'error' in data) {
      const d = data as ResponseError;
      Object.keys(d.error).forEach(key=>this.error[key]=d.error[key]);
    }
  }
  
}

export type { UserRegister, LoginRequest, ResponseToken };
export type {
  AccountGroups,
  AccountGroup,
  NewAccount,
  Accounts,
  AccountWithPasswordView,
  AccountView,
};
