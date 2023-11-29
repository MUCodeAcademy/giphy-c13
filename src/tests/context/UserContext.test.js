import { render, fireEvent } from '@testing-library/react';
import { UserProvider, useUserContext } from '../../context/UserContext';

// Make a test component that uses the context
const TestComponent = () => {
    // Gets the user state and setUser/clearUser functions from the context
    const { user, setUser, clearUser } = useUserContext();

    // Make a simple version of our login functionality
    return (
        <div>
            <input
                data-testid="username"
                // If there is a user, the value should be their username. Otherwise, it should be empty
                value={user ? user.username : ''}
            />
            <button onClick={() => setUser({ username: "test" })}>Set User</button>
            <button onClick={() => clearUser()}>Clear User</button>
        </div>
    )
}

describe('UserContext', () => {
    it('should set the user and clear the user', () => {
        const { getByTestId, getByText } = render(
            <UserProvider>
                <TestComponent />
            </UserProvider>
        )
        
        // See if the input is empty at the start
        const usernameInput = getByTestId("username");
        expect(usernameInput.value).toBe('');
        
        // See if it sets the user correctly
        fireEvent.click(getByText("Set User"));
        expect(usernameInput.value).toBe("test");

        // See if it clears the user correctly
        fireEvent.click(getByText("Clear User"));
        expect(usernameInput.value).toBe('');
    });
});