import { render, screen } from "@testing-library/react";

import ListComponent from ".";

describe("List Component", () => {

  const cards:any = [ { name: 'John Doe', city: 'New York', country: 'USA', favorite_sport: 'Basketball' }];

  it("render main component", () => {
   
    var total = 10
    render(<ListComponent current={0} data={cards} hiddenPagination total={total} totalPages={10}/>);
  
    const mainElement = screen.getByTestId('list-test');
    expect(mainElement).toBeInTheDocument();

    const cardElements = screen.getAllByTestId('card-test');
    expect(cardElements).toHaveLength(cards.length);

    cards.forEach((e: any) => {
      const nameElement = screen.getByText(e.name);
      const locationElement = screen.getByText(`${e.city},${e.country}`);
      const sportElement = screen.getByText(e.favorite_sport);
      
      expect(nameElement).toBeInTheDocument();
      expect(locationElement).toBeInTheDocument();
      expect(sportElement).toBeInTheDocument();
    });
  
  });

  it("render pagination component", () => {
   
    render(<ListComponent current={0} data={cards} hiddenPagination={false} total={cards.length} totalPages={1}/>);
  
    const pagElement = screen.getByTestId('pag-test');
    expect(pagElement).toBeInTheDocument();

    const pagItemElement = screen.getAllByTestId('pag-item-test');
    expect(pagItemElement).toHaveLength(1);
    
  });

});