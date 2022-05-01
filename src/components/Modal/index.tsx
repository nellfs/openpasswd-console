import classNames from 'classnames';
import { PropsWithChildren } from 'react';
import { XIcon } from '@heroicons/react/solid';

export interface ModalProps {
  visible: boolean;
  onClose: () => void;
}

export function Modal(props: PropsWithChildren<ModalProps>) {
  return (
    <>
      <div
        className={classNames(
          `   absolute top-0 left-0 right-0, bottom-0,
              w-full h-full
              bg-black opacity-70      
          `,
          { hidden: !props.visible }
        )}
      />
      <div
        className={classNames(
          `   absolute left-1/2 p-4
              w-full max-w-md
              h-full md:h-auto
              transform -translate-x-1/2
          `,
          { hidden: !props.visible }
        )}
      >
        {props.children}
      </div>
    </>
  );
}

export function ModalPanel(props: PropsWithChildren<ModalProps>) {
  return (
    <Modal {...props}>
      <div
        className="
              relative
              bg-white
              rounded-lg
              shadow
            "
      >
        <button
          type="button"
          className="
                absolute
                top-3
                right-2.5
                hover:bg-gray-200
                hover:text-gray-900
                rounded-lg
                dark:hover:bg-gray-800 dark:hover:text-white
              "
          onClick={props.onClose}
        >
          <XIcon className="h-5 w-5" />
        </button>
        <div className="p-6">
          {props.children}
          {/* <button
            data-modal-toggle="popup-modal"
            type="button"
            className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
          >
            Yes, I'm sure
          </button>
          <button
            data-modal-toggle="popup-modal"
            type="button"
            className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
          >
            No, cancel
          </button> */}
        </div>
      </div>
    </Modal>
  );
}

export function ModalConfirmation(props: PropsWithChildren<ModalProps>) {
  return (
    <Modal {...props}>
      <div
        className="
              relative
              bg-white
              rounded-lg
              shadow
            "
      >
        <button
          type="button"
          className="
                absolute
                top-3
                right-2.5
                hover:bg-gray-200
                hover:text-gray-900
                rounded-lg
                dark:hover:bg-gray-800 dark:hover:text-white
              "
          onClick={props.onClose}
        >
          <XIcon />
        </button>
        <div className="p-6">
          {/* <button
            data-modal-toggle="popup-modal"
            type="button"
            className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
          >
            Yes, I'm sure
          </button>
          <button
            data-modal-toggle="popup-modal"
            type="button"
            className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
          >
            No, cancel
          </button> */}
        </div>
      </div>
    </Modal>
  );
}
