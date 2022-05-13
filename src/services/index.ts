import config from '../config.json';
import { SetterOrUpdater } from 'recoil';
import {
  AccountGroup,
  AccountGroups,
  LoginRequest,
  ResponseError,
  ResponseToken,
  UserRegister,
  NewAccount,
  Accounts,
  AccountWithPasswordView,
  AccountView,
} from './models';

export type Response<T> = {
  status: number;
  error?: string;
  data?: T;
};

export default class OpenPasswdClient {
  basePath: string;
  constructor(
    private token?: string,
    private setToken?: SetterOrUpdater<string | undefined>
  ) {
    this.basePath = config.openpasswd_server;
  }

  async post<B, R>(path: string, body: B): Promise<Response<R>> {
    const url = `${this.basePath}${path}`;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }
    const options = {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    };

    return this.send(url, options);
  }

  get<R>(path: string): Promise<Response<R>> {
    const url = `${this.basePath}${path}`;
    const headers: HeadersInit = {};
    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }
    const options: RequestInit = {
      method: 'GET',
      headers,
    };

    return this.send(url, options);
  }

  async send<R>(url: RequestInfo, init?: RequestInit): Promise<Response<R>> {
    try {
      const response = await fetch(url, init);
      const data = await response.json();

      if (response.status === 400 && this.setToken) {
        this.setToken(undefined);
      }

      return {
        status: response.status,
        data,
      };
    } catch (e) {
      return {
        status: 500,
        error: `${e}`,
      };
    }
  }

  async authRegister(user: UserRegister): Promise<ResponseError | number> {
    const response = await this.post('/api/auth/user', user);
    if (response.status === 201) {
      return response.status;
    } else {
      const e = new ResponseError(response.data);
      throw e;
    }
  }

  async authToken(login: LoginRequest): Promise<ResponseToken> {
    const response = await this.post('/api/auth/token', login);
    if (response.status === 200) {
      return response.data as ResponseToken;
    } else {
      const e = new ResponseError(response.data);
      throw e;
    }
  }

  async authLogout(): Promise<number> {
    const response = await this.post('/api/auth/logout', undefined);
    if (response.status === 200) {
      return response.data as number;
    } else {
      const e = new ResponseError(response.data);
      throw e;
    }
  }

  async listAccountGroups(): Promise<AccountGroups> {
    const response = await this.get('/api/accounts/groups');
    if (response.status === 200) {
      return response.data as AccountGroups;
    } else {
      const e = new ResponseError(response.data);
      throw e;
    }
  }

  async createAccountGroup(name: string): Promise<AccountGroup> {
    const response = await this.post('/api/accounts/groups', { name });
    if (response.status === 201) {
      return response.data as AccountGroup;
    } else {
      const e = new ResponseError(response.data);
      throw e;
    }
  }

  async listAccounts(id?: number): Promise<Accounts> {
    let url = `/api/accounts`;

    if (id) {
      url += `?group_id=${id}`;
    }

    const response = await this.get(url);
    if (response.status === 200) {
      return response.data as Accounts;
    } else {
      const e = new ResponseError(response.data);
      throw e;
    }
  }

  async createAccount(newAccount: NewAccount): Promise<AccountView> {
    const response = await this.post('/api/accounts', newAccount);
    if (response.status === 201) {
      return response.data as AccountView;
    } else {
      const e = new ResponseError(response.data);
      throw e;
    }
  }

  async getAccountWithPassword(id: number): Promise<AccountWithPasswordView> {
    const response = await this.get(`/api/accounts/${id}`);
    if (response.status === 200) {
      return response.data as AccountWithPasswordView;
    } else {
      const e = new ResponseError(response.data);
      throw e;
    }
  }
}
