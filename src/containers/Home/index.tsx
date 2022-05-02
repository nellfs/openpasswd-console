import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { auth_token } from '../../atoms';
import { RoundButton } from '../../components/Button';
import { ModalPanel } from '../../components/Modal';
import { listAccountGroups } from '../../services';
import { AccountGroups, ResponseError } from '../../services/models';
import GroupRegisterModal from './GroupRegisterModal';

interface AccountGroup {
  id: number;
  name: string;
}

const Home = () => {
  const [accountGrupo, setAccountGroup] = useState<AccountGroup[]>([]);
  const token = useRecoilValue(auth_token);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchData = async () => {
    let result = await listAccountGroups(token);
    if ('items' in result) {
      setAccountGroup((result as AccountGroups).items);
    } else {
      alert(result as ResponseError);
    }
  };

  useEffect(() => {
    fetchData().catch(console.error);
  }, []);

  const elements = accountGrupo.map((e) => (
    <Link
      to={`/group/${e.id}:${e.name}`}
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
    >
      {e.name}
    </Link>
  ));

  return (
    <>
      <GroupRegisterModal
        visible={modalVisible}
        onComplete={fetchData}
        onClose={() => setModalVisible(false)}
      />
      <header className="bg-white shadow">
        <div className="flex justify-between max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Groups</h1>
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

export default Home;
