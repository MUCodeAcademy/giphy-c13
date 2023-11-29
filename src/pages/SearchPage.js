import { useEffect, useState } from 'react';
import useAPI from '../functions/useAPI';
import { useFavoritesContext } from '../context/FavoritesContext';

const SearchPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [gifs, setGifs] = useState(null);
    const { data, loading, error } = useAPI(searchTerm);
    const { addFavorite } = useFavoritesContext();

    const searchClick = () => {
        setSearchTerm(inputValue);
    }

    useEffect(() => {
        // If there is data from the API, AND data has another data object inside it,
        // that means we successfully got gifs, and we can put them in the gifs state
        if (data && data.data) {
            setGifs(data.data);
        }
    }, [data]);

    return (
        <div>
            <h1>Search Page</h1>
            <input 
                type='text'
                onChange={e => setInputValue(e.target.value)}
                placeholder='Search for gifs'
            />
            <button onClick={searchClick}>Search</button>
            {/* If the gifs are an array, we can display each title and the image url. Otherwise, display nothing. */}
            {Array.isArray(gifs) ? gifs.map((gif) => (
                <div>
                    <button onClick={() => addFavorite(gif.images.original.url)}>Add Favorite</button>
                    <img src={gif.images.original.url} data-testid="gif" />
                </div>
            )) : <p></p>}
            </div>
    )
}

export default SearchPage;