import { useState, useEffect } from 'react';

const baseURL = 'https://api.giphy.com/v1/gifs/search?api_key=z7jkhi2tdaoRnJbd9uaJatlf7ZwuoXjS&q=';

export default function useAPI(searchTerm) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getGifs() {
            try {
               setData(null);
               setError(null);
               setLoading(true);
               const response = await fetch(baseURL + searchTerm);
               if (response.ok) {
                const json = await response.json();
                setData(json);
               } else {
                throw response;
               }
            } catch (e) {
                setError(e);
            } finally {
                setLoading(false);
            }
        }
        getGifs();
    }, [searchTerm]);

    return { data, error, loading };
}