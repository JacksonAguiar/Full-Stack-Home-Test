import Modal from "react-modal";
import { FaFileCsv } from "react-icons/fa6";

interface ModalProps {
  filename: string;
  size: string;
  modalIsOpen: boolean;
  closeModal: (value: boolean) => {};
}
const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)'
    },
  };

const ConfirmFileModal = ({
  filename,
  size,
  modalIsOpen,
  closeModal,
}: ModalProps) => {
  return (
    <Modal ariaHideApp={false} id="modal" isOpen={modalIsOpen} contentLabel="Confirm Modal" style={customStyles}>
    <h1 className="font-semibold text-xl mb-4">Submit file?</h1>
      <div className="bg-green-200 flex w-min items-center justify-center p-2 rounded-lg space-x-2">
        <FaFileCsv color="rgb(22,101,52)" size={32} />
       
        <div className="">
          <h3 className="font-semibold">{filename}</h3>
          <span className="font-normal text-xs"> {size}</span>
        </div>
      </div>
      <div className="flex space-x-2 mt-8">
        <button
          type="button"
          onClick={()=>closeModal(false)}
          className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Cancel
        </button>
        <button
          type="button"
          onClick={()=>closeModal(true)}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Confirm
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmFileModal;