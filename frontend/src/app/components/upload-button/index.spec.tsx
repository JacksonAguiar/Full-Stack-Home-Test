import { fireEvent, render, screen } from "@testing-library/react";

import UploadButton from ".";

describe("UploadButton", () => {
 
  it("render component", () => {
    render(<UploadButton onSubmit={() => {}} />);

    expect(screen.getByText("Upload a csv")).toBeInTheDocument();
    expect(screen.getByTestId("file-input")).toBeInTheDocument();
  });

  it("should call input upload function", () => {
    const mockOnFileUpload = jest.fn();

    render(<UploadButton onSubmit={mockOnFileUpload} />);
   
    const inputElement = screen.getByTestId("file-input");
    const file = new File(["file content"], "example.csv", {
      type: "text/csv",
    });

    fireEvent.change(inputElement, { target: { files: [file] } });

    expect(mockOnFileUpload).toHaveBeenCalledWith(file);
  });

  it("should call submit function", () => {
    const mockOnFileUpload = jest.fn();

    render(<UploadButton onSubmit={mockOnFileUpload} />);
   
    const uploadButton = screen.getByTestId("upload-button");
    const inputElement = screen.getByTestId("file-input");
    
    const file = new File(["file content"], "example.csv", {
      type: "text/csv",
    });

    fireEvent.click(uploadButton, { target: { files: [file] } });
    fireEvent.change(inputElement, { target: { files: [file] } });

    expect(mockOnFileUpload).toHaveBeenCalledWith(file);
  });
  
});
