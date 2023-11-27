import { useUserContext } from "../context/UserContext";
import { useFavoritesContext } from "../context/FavoritesContext";

const FavoritesPage = () => {
    // Get the user's username
    const { user } = useUserContext();
    // Get their list of favorites
    const { favorites } = useFavoritesContext();

    return (
        <div>
            <h1>{user}'s Favorites</h1>
            {/* Loop through the favorites and display each one */}
            {favorites.map((gif) => (
                <div>
                    <img src={gif} />
                </div>
            ))}
        </div>
    )
}

export default FavoritesPage;