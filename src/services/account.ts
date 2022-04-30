import { AccountGroups, ResponseError } from './models';
import config from '../config.json';
import { useRecoilValue } from 'recoil';
import { auth_token } from '../atoms';

export async function listAccountGroups(
  token: string
): Promise<ResponseError | AccountGroups> {
  const url = `${config.openpasswd_server}/api/accounts/groups`;

  const options: RequestInit = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    let response = await fetch(url, options);
    let data = await response.json();

    if (response.status == 201) {
      return data as AccountGroups;
    } else {
      return data as ResponseError;
    }
  } catch (e) {
    return { error: { message: `${e}` } };
  }
}

export async function listAccounts(
  token: string
): Promise<ResponseError | AccountGroups> {
  const url = `${config.openpasswd_server}/api/accounts`;

  const options: RequestInit = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    let response = await fetch(url, options);
    let data = await response.json();

    if (response.status == 201) {
      return data as AccountGroups;
    } else {
      return data as ResponseError;
    }
  } catch (e) {
    return { error: { message: `${e}` } };
  }
}
