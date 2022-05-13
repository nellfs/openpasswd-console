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
  constructor(data: any) {
    this.error = {};
    if (data || data.error) {
      Object.keys(data.error).forEach(key=>this.error[key]=data.error[key]);
    }
  }
  error: {
    [key: string]: string;
  };
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
