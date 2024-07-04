import React from "react";
import { render } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import Sidebar from "./sidebar";

describe("Sidebar Component", () => {
  it("should render the sidebar component", () => {
    const { container } = render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );
    expect(container.firstChild).toHaveClass('sidebar');
  });

  it("should render Home link with correct icon and tooltip", () => {
    const { getByLabelText } = render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );
    
    const homeIcon = getByLabelText('Inicio');
    expect(homeIcon).toBeInTheDocument();
    expect(homeIcon.closest('a')).toHaveAttribute('href', '/');
  });

  it("should render Add Task link with correct icon and tooltip", () => {
    const { getByLabelText } = render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );

    const addIcon = getByLabelText('Add Task');
    expect(addIcon).toBeInTheDocument();
    expect(addIcon.closest('a')).toHaveAttribute('href', '/addItem');
  });
});
