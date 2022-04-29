export interface UserRegister {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface ResponseError {
  error: {
    [key: string]: string;
  };
}

export interface ResponseToken {
  access_token: string;
  type: string;
}
