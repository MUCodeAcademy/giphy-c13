import TestPage from "../pages/TestPage";
import { render, fireEvent } from "@testing-library/react";

describe("TestPage", () => {
    it("should display the h1 element", () => {
        // This gets the getByText function from the render method
        // so we can use it in our test
        const { getByText } = render(<TestPage />);
        // Gets the element with the text "Test Page" and stores it in a variable
        const element = getByText("Test Page");
        // Tests to see if the element is somewhere in the document
        expect(element).toBeInTheDocument();
    });

    it("should update the username input", () => {
        const { getByPlaceholderText } = render(<TestPage />);

        const usernameInput = getByPlaceholderText("Username");

        expect(usernameInput).toBeInTheDocument();

        // Types "justin" into the usernameInput
        fireEvent.change(usernameInput, { target: { value: "justin" }});

        // Check to see if the test successfully typed "justin" into the input
        expect(usernameInput).toHaveValue("justin");
    });
});