import { render, fireEvent, waitFor } from '@testing-library/react';
import SearchPage from '../../pages/SearchPage';
import useAPI from '../../functions/useAPI';
import { useFavoritesContext } from '../../context/FavoritesContext';

// Mock the custom hooks
jest.mock('../../functions/useAPI', () => ({
    // Since the useAPI hook is an EcmaScript module, we need the test to recognize that
    __esModule: true,
    // Mocks the default export (which is the useAPI hook)
    default: jest.fn(),
}));
jest.mock('../../context/FavoritesContext', () => ({
    useFavoritesContext: jest.fn(),
}));

describe("SearchPage", () => {
    beforeEach(() => {
        // We need to mock the data from the useAPI hook
        useAPI.mockReturnValue(() => ({
            data: null,
            loading: false,
            error : false
        }));

        // We need to mock the addFavorite function from our FavoritesContext
        useFavoritesContext.mockReturnValue(() => ({
            addFavorite: jest.fn(),
        }));
    });
    it("should update the search bar on change", () => {
        // Render the search page
        const { getByPlaceholderText } = render(<SearchPage />);
        // Get the search input element
        const searchInput = getByPlaceholderText("Search for gifs");
        // Change the value of the input search bar
        fireEvent.change(searchInput, { target: { value: "cat" } });
        // See if it correctly changed
        expect(searchInput.value).toBe("cat");
    });

    it("should display gifs", async () => {
        useAPI.mockReturnValue(() => ({
            data: { data: [{ images: { original: { url: "http://website.com" } } }] },
            loading: false,
            error: false
        }));

        const { getByText, getByPlaceholderText, getByTestId } = render(<SearchPage />);

        const searchInput = getByPlaceholderText("Search for gifs"); 
        fireEvent.change(searchInput, { target: { value: "cat" } });
        fireEvent.click(getByText("Search"));

        // Get the image that appeared in the document
        const images = await getByTestId("gif");

        // Check if the src matches the URL
        expect(images.src).toBe("http://website.com");
    });
});