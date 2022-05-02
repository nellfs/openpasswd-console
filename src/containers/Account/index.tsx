import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { auth_token } from '../../atoms';
import { Button, RoundButton } from '../../components/Button';
import { listAccounts } from '../../services';
import { AccountGroups, ResponseError } from '../../services/models';
import { Accounts, AccountView } from '../../services/models/account';
import AccountRegisterModal from './AccountRegisterModal';

interface AccountGroup {
  id: number;
  name: string;
}

interface HistoryStateProps {
  usr?: {
    id: number | undefined;
  };
}

const Account = () => {
  const [account, setAccount] = useState<AccountView[]>([]);
  const token = useRecoilValue(auth_token);
  const [modalVisible, setModalVisible] = useState(false);

  let { name } = useParams();
  let [id, group] = name!.split(':');
  // let state = history.state as HistoryStateProps | undefined;

  // if (state || state!.usr || state!.usr!.id) {
  //   console.log('by id ' + state!.usr!.id);
  //   console.log('by name ' + name);
  // } else {
  // }

  const fetchData = async () => {
    let result = await listAccounts(token, parseInt(id));
    if ('items' in result) {
      setAccount((result as Accounts).items);
    } else {
      alert(result as ResponseError);
    }
  };

  useEffect(() => {
    fetchData().catch(console.error);
  }, []);

  const elements = account.map((e) => (
    <button
      className="
            text-center
            inline-block
            px-7 py-3
            disabled:bg-slate-600
            bg-blue-600
            text-white
            font-medium text-sm leading-snug uppercase
            rounded
            shadow-md
            hover:bg-blue-700 hover:shadow-lg
            focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
            active:bg-blue-800 active:shadow-lg
            transition duration-150 ease-in-out
            w-full
          "
      key={e.id}
      onClick={() => navigator.clipboard.writeText(e.name)}
    >
      {e.name}
    </button>
  ));

  return (
    <>
      <AccountRegisterModal
        visible={modalVisible}
        onComplete={fetchData}
        onClose={() => setModalVisible(false)}
        groupId={parseInt(id)}
      />
      <header className="bg-white shadow">
        <div className="flex justify-between max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Accounts for {group}
          </h1>
          <RoundButton type="button" onClick={() => setModalVisible(true)}>
            +
          </RoundButton>
        </div>
      </header>
      <main className="flex-grow">
        <div
          className="
              grid
              grid-cols-2
              md:grid-cols-4
              lg:grid-cols-6
              xl:grid-cols-8
              lx:grid-cols-12
              gap-4
              p-5
            "
        >
          {elements}
        </div>
      </main>
    </>
  );
};

export default Account;
