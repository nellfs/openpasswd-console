import {
  LoginRequest,
  ResponseError,
  ResponseToken,
  UserRegister,
} from './models';
// TODO: Better place config.json
import config from '../config.json';

export async function authRegister(
  user: UserRegister
): Promise<ResponseError | number> {
  const url = `${config.openpasswd_server}/api/auth/user`;
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  };

  try {
    let response = await fetch(url, options);

    if (response.status == 201) {
      return response.status;
    } else {
      let data = await response.json();
      return data as ResponseError;
    }
  } catch (e) {
    return { error: { message: `${e}` } };
  }
}

export async function authToken(
  login: LoginRequest
): Promise<ResponseError | ResponseToken> {
  const url = `${config.openpasswd_server}/api/auth/token`;
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(login),
  };

  try {
    let response = await fetch(url, options);
    let data = await response.json();
    if (response.status == 201) {
      return data as ResponseToken;
    } else {
      return data as ResponseError;
    }
    console.log(data);
  } catch (e) {
    return { error: { message: `${e}` } };
  }
}
