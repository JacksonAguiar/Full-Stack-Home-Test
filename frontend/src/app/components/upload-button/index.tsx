import React, { useRef } from "react";
// import { FiUpload } from "react-icons/fi";

interface ButtonProps {
  onSubmit: Function;
}

const UploadButtonComponent: React.FC<ButtonProps> = ({
  onSubmit,
  ...props
}: ButtonProps) => {
  const hiddenFileInput = useRef<any>(null);

  const handleClick = (event: any) => {
    if (hiddenFileInput.current) hiddenFileInput.current.click();
  };
  const handleChange = (event: any) => {
    const fileUploaded = event.target.files[0];
    onSubmit(fileUploaded);
  };

  return (
    <div>
      {/* <label htmlFor="input" className={"hidden"}> */}
      {/* <FiUpload /> */}
      <input
        type="file"
        accept=".csv"
        data-testid="file-input"
        onChange={handleChange}
        ref={hiddenFileInput}
      />
      {/* </label> */}

      <button
        type="button"
        onClick={handleClick}
        data-testid="upload-button"
        className="fixed bottom-6 right-6 text-white hover:drop-shadow-xl bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-700 transition-colors "
      >
        Upload a csv
      </button>
    </div>
  );
};

export default UploadButtonComponent;
