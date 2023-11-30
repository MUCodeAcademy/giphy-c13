import useAPI from '../../functions/useAPI';
import { renderHook, act } from '@testing-library/react';

describe("useAPI", () => {
    it("should fetch data", async () => {
        // Mock the fetch function
        // We need to add a delay since it takes a small amount of time to fetch data
        const mockFetchResponse = () => new Promise(resolve => {
            // Simulates a network delay and resolves with the mocked response
            setTimeout(() => resolve({
                ok: true,
                json: async () => ({ data: 'test' }),
            }), 100);
        });
        // Mocks a fetch request with our mockFetchResponse function
        global.fetch = jest.fn().mockImplementation(mockFetchResponse);

        // It will put the data from our hook in this result variable
        const { result } = renderHook(() => useAPI('searchTerm'));

        // Act is a utility that ensures all updates are finished before the assertions
        await act(async () => {
            // Waits for the delay to let the hook fetch data
            await new Promise(resolve => setTimeout(resolve, 100));
        });

        expect(result.current.data).toEqual({ data: 'test' });
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe(null);
    });
});