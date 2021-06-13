import { render, screen } from '@testing-library/react';
import { ErrorMessage } from './ErrorMessage';

describe('Error Message Component', () => {
  test('Error Message should be displayed', () => {
    render(<ErrorMessage errorMsg={'Nodes must be an array'} />);
    const errorMessageText = screen.getByText('Error: Nodes must be an array');
    expect(errorMessageText).toBeInTheDocument();
  });
});
