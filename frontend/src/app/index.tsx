import { useCallback, useEffect, useState } from "react";
import { UserInterface } from "../types/interfaces";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import UploadButtonComponent from "./components/upload-button";
import SearchComponent from "./components/search";
import ListComponent from "./components/list";
import FileService from "../services/FilesService";
import UserService from "../services/UserService";
import ConfirmFileModal from "./components/file-modal";

const userService = new UserService();

function App() {
  const query = new URLSearchParams(window.location.search).get("page");
  const current = query ? Number(query) : 1;

  const [users, setUsers] = useState<UserInterface[]>([]);
  const [isQuerySearch, updateQueryStatus] = useState<boolean>(false);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [tempFile, setTempFile] = useState<object | null>(null);

  const [isModalOpen, setOpenModal] = useState<boolean>(false);

  const fetchUsers = useCallback(async () => {
    
    try {
      const res = await userService.fetchUsers(current);
      
      setUsers(res.data.users);
      setTotalItems(res.data.total);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      showToast("Not able to fecth users", "error");
    }
      
  }, [setUsers, setTotalItems, setTotalPages, current]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const showToast = (message: string, type: "success" | "error") => {
    toast(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      type: type,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  const onSubmitFile = async (res: boolean) => {
    if (res) {
      const service = new FileService();

      const response = await service.uploadFile(tempFile!);
      const message = (await response.json()).message;

      if (response.status === 200) {
        showToast(message, "success");
      } else {
        showToast(message, "error");
      }

      await fetchUsers();
    }

    setOpenModal(false);
    setTempFile(null);
  };

  const onUploadDocument = async (file: any) => {
    setTempFile(() => file);
    setOpenModal(true);
  };

  const onSubmitSearch = async (query: string) => {
    const res = await userService.fetchUsersByQuery(query);

    setUsers(res.data.users);
    updateQueryStatus(true);

    if (query === "") {
      updateQueryStatus(false);
    }
  };

  return (
    <div className="p-8">
      <header className="md:w-1/2 m-auto mb-4">
        <SearchComponent onSubmit={onSubmitSearch} />
      </header>

      <ListComponent
        current={current}
        data={users}
        hiddenPagination={isQuerySearch}
        total={totalItems}
        totalPages={totalPages + 1}
      />

      <UploadButtonComponent onSubmit={onUploadDocument} />
      <ConfirmFileModal
        closeModal={onSubmitFile}
        filename={tempFile ? (tempFile as any).name : ""}
        modalIsOpen={isModalOpen}
        size={tempFile ? (tempFile as any).size + " KB" : ""}
      />

      <ToastContainer />
    </div>
  );
}

export default App;
