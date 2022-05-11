import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { auth_token } from '../../atoms';
import { RoundButton } from '../../components/Button';
import OpenPasswdClient from '../../services';
import { ResponseError } from '../../services/models';
import { AccountView } from '../../services/models/account';
import AccountRegisterModal from './AccountRegisterModal';

// interface HistoryStateProps {
//   usr?: {
//     id: number | undefined;
//   };
// }

const Account = () => {
  const navigate = useNavigate();
  const [account, setAccount] = useState<AccountView[]>([]);
  const [token, setToken] = useRecoilState(auth_token);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { name } = useParams();

  let id: undefined | number = undefined;
  let group = 'undefined';

  if (name) {
    const [name0, name1] = name.split(':');
    id = parseInt(name0);
    group = name1;
  } else {
    navigate('/', { replace: true });
  }

  // let state = history.state as HistoryStateProps | undefined;

  // if (state || state!.usr || state!.usr!.id) {
  //   console.log('by id ' + state!.usr!.id);
  //   console.log('by name ' + name);
  // } else {
  // }

  const fetchData = async () => {
    if (!id) return;
    const openPasswdClient = new OpenPasswdClient(token, setToken);
    try {
      const result = await openPasswdClient.listAccounts(id);
      setAccount(result.items);
    } catch (e) {
      if (e instanceof ResponseError) {
        console.log(`ResponseError: ${e}`);
      } else {
        console.log(`Exception: ${e}`);
      }
    }
  };

  useEffect(() => {
    fetchData().catch(console.error);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
      disabled={isLoading}
      onClick={() => copyPassword(e.id)}
    >
      {e.name}
    </button>
  ));

  const copyPassword = async (id: number) => {
    const openPasswdClient = new OpenPasswdClient(token, setToken);
    try {
      setIsLoading(true);
      const account = await openPasswdClient.getAccountWithPassword(id);
      navigator.clipboard.writeText(account.password);
    } catch (e) {
      if (e instanceof ResponseError) {
        console.log(`ResponseError: ${e}`);
      } else {
        console.log(`Exception: ${e}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AccountRegisterModal
        visible={modalVisible}
        onComplete={fetchData}
        onClose={() => setModalVisible(false)}
        groupId={id ?? -1}
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
