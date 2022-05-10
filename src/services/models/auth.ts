export interface UserRegister {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export class ResponseError {
  constructor() {
    this.error = {};
  }
  error: {
    [key: string]: string;
  };
}

export interface ResponseToken {
  access_token: string;
  type: string;
}
