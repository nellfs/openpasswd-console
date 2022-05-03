import { AccountGroups, ResponseError } from './models';
import config from '../config.json';
import { AccountGroup, NewAccount } from './models';
import { AccountWithPasswordView } from './models/account';

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

export async function createAccountGroup(
  token: string,
  name: string
): Promise<ResponseError | AccountGroup> {
  const url = `${config.openpasswd_server}/api/accounts/groups`;
  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  };

  try {
    let response = await fetch(url, options);
    let data = await response.json();

    if (response.status == 201) {
      return data as AccountGroup;
    } else {
      return data as ResponseError;
    }
  } catch (e) {
    return { error: { message: `${e}` } };
  }
}

export async function listAccounts(
  token: string,
  id?: number
): Promise<ResponseError | AccountGroups> {
  let url = `${config.openpasswd_server}/api/accounts`;

  if (id) {
    url += `?group_id=${id}`;
  }

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

export async function createAccount(
  token: string,
  newAccount: NewAccount
): Promise<ResponseError | AccountGroup> {
  const url = `${config.openpasswd_server}/api/accounts`;
  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newAccount),
  };

  try {
    let response = await fetch(url, options);
    let data = await response.json();

    if (response.status == 201) {
      return data as AccountGroup;
    } else {
      return data as ResponseError;
    }
  } catch (e) {
    return { error: { message: `${e}` } };
  }
}

export async function getAccountWithPassword(
  token: string,
  id: number
): Promise<ResponseError | AccountWithPasswordView> {
  let url = `${config.openpasswd_server}/api/accounts/${id}`;

  const options: RequestInit = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    let response = await fetch(url, options);
    let data = await response.json();

    if (response.status == 200) {
      return data as AccountWithPasswordView;
    } else {
      return data as ResponseError;
    }
  } catch (e) {
    return { error: { message: `${e}` } };
  }
}
