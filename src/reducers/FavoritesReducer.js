export const ADD_FAVORITE = "Add Favorite";

export function favoritesReducer(state, action) {
    switch (action.type) {
        // If the type is ADD_FAVORITE, just return the favorites state with the new gif
        case ADD_FAVORITE:
            return [...state, action.payload];

        // You will want to add another case for REMOVE_FAVORITE for removing favorites

        // If the type is not any of the above, give an error
        default: 
            throw new Error("Invalid action");
    }
}