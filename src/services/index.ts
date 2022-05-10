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

export type Response = {
  status: number;
  data: any;
};

export default class OpenPasswdClient {
  basePath: string;
  constructor(
    private token?: string,
    private setToken?: SetterOrUpdater<string | undefined>
  ) {
    this.basePath = config.openpasswd_server;
  }

  async post(path: string, body: any): Promise<Response> {
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

  get(path: string): Promise<Response> {
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

  async send(url: RequestInfo, init?: RequestInit): Promise<Response> {
    try {
      let response = await fetch(url, init);
      let data = await response.json();

      if (response.status == 400 && this.setToken) {
        this.setToken(undefined);
      }

      return {
        status: response.status,
        data,
      };
    } catch (e) {
      return {
        status: 500,
        data: `${e}`,
      };
    }
  }

  async authRegister(user: UserRegister): Promise<ResponseError | number> {
    let response = await this.post('/api/auth/user', user);
    if (response.status == 201) {
      return response.status;
    } else {
      throw response.data as ResponseError;
    }
  }

  async authToken(login: LoginRequest): Promise<ResponseToken> {
    let response = await this.post('/api/auth/token', login);
    if (response.status == 200) {
      return response.data as ResponseToken;
    } else {
      throw response.data as ResponseError;
    }
  }

  async authLogout(): Promise<number> {
    let response = await this.post('/api/auth/logout', undefined);
    if (response.status == 200) {
      return response.data as number;
    } else {
      throw response.data as ResponseError;
    }
  }

  async listAccountGroups(): Promise<AccountGroups> {
    let response = await this.get('/api/accounts/groups');
    if (response.status == 200) {
      return response.data as AccountGroups;
    } else {
      throw response.data as ResponseError;
    }
  }

  async createAccountGroup(name: string): Promise<AccountGroup> {
    let response = await this.post('/api/accounts/groups', { name });
    if (response.status == 201) {
      return response.data as AccountGroup;
    } else {
      throw response.data as ResponseError;
    }
  }

  async listAccounts(id?: number): Promise<Accounts> {
    let url = `/api/accounts`;

    if (id) {
      url += `?group_id=${id}`;
    }

    let response = await this.get(url);
    if (response.status == 200) {
      return response.data as Accounts;
    } else {
      throw response.data as ResponseError;
    }
  }

  async createAccount(newAccount: NewAccount): Promise<AccountView> {
    let response = await this.post('/api/accounts', newAccount);
    if (response.status == 201) {
      return response.data as AccountView;
    } else {
      throw response.data as ResponseError;
    }
  }

  async getAccountWithPassword(id: number): Promise<AccountWithPasswordView> {
    let response = await this.get(`/api/accounts/${id}`);
    if (response.status == 200) {
      return response.data as AccountWithPasswordView;
    } else {
      throw response.data as ResponseError;
    }
  }
}
