// Testing ideas

// 1. Check to see if the favorite gifs render
// 2. Check to see if the user's username is being displayed
//  - You'll have to mock the FavoritesContext and UserContext

import { render } from '@testing-library/react';
import FavoritesPage from '../../pages/FavoritesPage';
import { useUserContext } from '../../context/UserContext';
import { useFavoritesContext } from '../../context/FavoritesContext';

// Mock the context
jest.mock('../../context/UserContext', () => ({
    useUserContext: jest.fn(),
}));
jest.mock('../../context/FavoritesContext', () => ({
    useFavoritesContext: jest.fn(),
}));

describe("FavoritesPage", () => {
    it("should render the username and their gifs", () => {
        // Mock the return values of the context
        useUserContext.mockReturnValue({ user: "Justin" });
        useFavoritesContext.mockReturnValue({ favorites: ['gif1', 'gif2']});

        // Render the component
        const { getByText, getAllByRole } = render(<FavoritesPage />);

        // Check if the username is on the page
        expect(getByText("Justin's Favorites")).toBeInTheDocument();

        // Check if the gifs are on the page
        const gifs = getAllByRole('img');
        // See if there are 2 gifs
        expect(gifs.length).toBe(2);
        expect(gifs[0]).toHaveAttribute('src', 'gif1');
        expect(gifs[1]).toHaveAttribute('src', 'gif2');
    });
});