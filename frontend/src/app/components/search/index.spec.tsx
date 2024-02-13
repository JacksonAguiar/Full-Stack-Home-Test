import { fireEvent, render, screen } from "@testing-library/react";

import SearchComponent from ".";

describe("Search Component", () => {
  
  it("render component", () => {
    render(<SearchComponent  onSubmit={() => {}} />);

    expect(screen.getByTestId("search-button")).toBeInTheDocument();
    expect(screen.getByTestId("search-input")).toBeInTheDocument();
  });

  it("shoud call callback function when submit button is clicked", () => {
    const mockOnFileUpload = jest.fn();

    render(
      <SearchComponent onSubmit={mockOnFileUpload}/>
    );

    fireEvent.click(screen.getByTestId("search-button"));

    expect(mockOnFileUpload).toHaveBeenCalled();
  });

  it("simulates typing in the input field", () => {
   render(<SearchComponent onSubmit={() => {}} />);

    const inputElement = screen.getByPlaceholderText('Search a user name, city...') as HTMLInputElement;
  
    fireEvent.change(inputElement, { target: { value: 'Testing!' } });
  
    expect(inputElement.value).toBe('Testing!');
  });


});