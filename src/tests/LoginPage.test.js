import { render, fireEvent } from '@testing-library/react';
import LoginPage from '../pages/LoginPage';
import { useUserContext } from '../context/UserContext';

// Specifies that we want to mock the UserContext
jest.mock('../context/UserContext', () => ({
    // Creates a mock function for useUserContext so that we can use it in our test
    useUserContext: jest.fn(),
}));

describe("Login Page", () => {
    beforeEach(() => {
        // Set default return values from our context before each test
        useUserContext.mockReturnValue({
            user: null,
            setUser: jest.fn(),
            clearUser: jest.fn(),
        });
    });

    it("should set the username when login button is clicked", () => {
        const { getByPlaceholderText, getByText } = render(<LoginPage />);

        // Get the username and button from the page
        const usernameInput = getByPlaceholderText("Username");
        const loginButton = getByText("Login");

        // Make the test type into the usernameInput and press login
        fireEvent.change(usernameInput, { target: { value: "justin" }});

        fireEvent.click(loginButton);

        // Check if setUser was called with the argument "justin"
        expect(useUserContext().setUser).toHaveBeenCalledWith("justin");
    });
})