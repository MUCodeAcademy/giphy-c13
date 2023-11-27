import { createContext, useContext, useReducer } from 'react';
import { favoritesReducer, ADD_FAVORITE } from '../reducers/FavoritesReducer';

const FavoritesContext = createContext(null);

export const useFavoritesContext = () => useContext(FavoritesContext);

export function FavoritesProvider (props) {
    const [favorites, dispatch] = useReducer(favoritesReducer, []);

    function addFavorite(gif) {
        dispatch({ type: ADD_FAVORITE, payload: gif })
    }

    // You will want to make a removeFavorite function here if you want to add that functionality

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite }}>
            {props.children}
        </FavoritesContext.Provider>
    )
}