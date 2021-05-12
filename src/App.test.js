import { render, screen } from '@testing-library/react';
import TaskMenu from './taskMenu/TaskMenu';

test('renders learn react link', () => {
    render(<TaskMenu />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});
