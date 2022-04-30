import classNames from 'classnames';
import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import Transition from '../Transition';
import { useRecoilValue } from 'recoil';
import { auth_token } from '../../atoms';

interface ILayoutProps {
  children: JSX.Element;
}

interface ILayoutState {
  CategoryVisible: boolean;
}

const Layout = (props: ILayoutProps) => {
  const [state, setState] = useState<ILayoutState>({ CategoryVisible: false });

  const token = useRecoilValue(auth_token);

  return (
    <div className="flex flex-col h-screen">
      <nav className="bg-gray-800">
        <div className="px-6 md:px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-10">
              <Link className="text-2xl font-bold text-white" to="/">
                OpenPasswd
              </Link>
              {/* 
              <Menu
                as="div"
                className={classNames('relative text-left', {
                  hidden: !!!token,
                  ['inline-block']: !!token,
                })}
              >
                <div>
                  <Menu.Button className="inline-flex justify-center w-fullpx-4 py-2 text-white text-sm font-medium">
                    Groups
                    <ChevronDownIcon
                      className="-mr-1 ml-2 h-5 w-5"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition>
                  <Menu.Items className="origin-top-left absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            All
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu> */}
            </div>
          </div>
        </div>
      </nav>

      {props.children}

      <footer className="min-w-full text-center lg:text-left bg-gray-100 text-gray-600">
        <div className="text-center p-6 bg-gray-200">
          <span>© 2022 Copyright:</span>
          <a
            className="text-gray-600 font-semibold"
            href="https://www.openpasswd.com/"
          >
            OpenPasswd
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
