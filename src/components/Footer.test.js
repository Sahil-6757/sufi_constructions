import { render, screen } from '@testing-library/react';
import Footer from './Footer';

test('protects the external developer link opened in a new tab', () => {
    render(<Footer />);

    const developerLink = screen.getByRole('link', { name: 'Sahil' });

    expect(developerLink).toHaveAttribute('target', '_blank');
    expect(developerLink).toHaveAttribute('rel', 'noopener noreferrer');
});
