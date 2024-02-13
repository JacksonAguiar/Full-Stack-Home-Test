import { useCallback, useEffect, useState } from "react";

import UploadButtonComponent from "./components/upload-button";
import SearchComponent from "./components/search";
import ListComponent from "./components/list";
import FileService from "../services/FilesService";
import UserService from "../services/UserService";
import { UserInterface } from "../types/interfaces";
import { Bounce, ToastContainer, toast } from "react-toastify";

const userService = new UserService();

function App() {
  const query = new URLSearchParams(window.location.search).get("page");
  const current = query ? Number(query) : 1;

  const [users, setUsers] = useState<UserInterface[]>([]);
  const [isQuerySearch, updateQueryStatus] = useState<boolean>(false);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  const fetchUsers = useCallback(async () => {
    const res = await userService.fetchUsers(current);

    setUsers(res.data.users);
    setTotalItems(res.data.total);
    setTotalPages(res.data.totalPages);
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

  const onUploadDocument = async (file: any) => {
    const service = new FileService();

    const response = await service.uploadFile(file);

    const message = (await response.json()).message;
    if (response.status === 200) {
      showToast(message, "success");
    } else {
      showToast(message, "error");
    }

    await fetchUsers();
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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
    </div>
  );
}

export default App;
