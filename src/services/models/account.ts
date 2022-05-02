export interface AccountGroups {
  items: AccountGroup[];
}

export interface AccountGroup {
  id: number;
  name: string;
}

export interface NewAccount {
  name: string;
  level: number;
  username: string;
  password: string;
  group_id: number;
}

export interface Accounts {
  items: AccountView[];
}

export interface AccountView {
  id: number;
  group_id: number;
  name: string;
  level: number;
}
