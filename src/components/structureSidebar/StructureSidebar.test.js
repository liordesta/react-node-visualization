import { render, screen } from '@testing-library/react';

import { StructureSidebar } from './StructureSidebar';

describe('Structure Sidebar Component', () => {
  test('Label should render', () => {
    render(<StructureSidebar />);

    const labelElm = screen.getByText('Select or Save current Data Structure');
    expect(labelElm).toBeInTheDocument();
  });
  test('Button should render', () => {
    render(<StructureSidebar />);

    const ButtonElm = screen.getByRole('button');
    expect(ButtonElm).toBeInTheDocument();
  });
  test('Select should render', () => {
    render(<StructureSidebar />);

    const selectElm = screen.getByRole('combobox');
    expect(selectElm).toBeInTheDocument();
  });
  test('Select should have 5 options', () => {
    render(<StructureSidebar />);

    const optionElm = screen.getAllByRole('option');
    expect(optionElm).toHaveLength(5);
  });
});
