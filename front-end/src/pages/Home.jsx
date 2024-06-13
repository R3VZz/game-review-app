import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Search from "../components/search-games";
import SortGames from "../components/sort-games";

const Home = () => {
    const [gameData, setGameData] = useState([]);
    const [err, setErr] = useState(null);
    const [filteredGames, setFilteredGames] = useState([]);
    const [sortGame, setSortChange] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');

    const fetchHandler = async () => {
        try {
            let response = await fetch("http://localhost:4000/api/games");
    
            if (!response) {
                throw new Error(response.statusText)
            }

            let data = await response.json();
            console.log(data);
        
            if (data.response && data.response.games) {
            setGameData(data.response.games);
            } else {
            setGameData([]);
            }

        } catch (err) {
            console.log(err.message);
            setErr(err.message)
        }
    }

    useEffect ( () => {
        fetchHandler()
    }, [])

    const handleSearch = (searchValue) => {
        const filteredItems = gameData.filter((game) => 
        game.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredGames(filteredItems);
    }

    const handleSortChange = (e) => {
        setSortChange(e.target.value);
    }

    const handleSortOrderChange = (e) => {
        setSortOrder(e.target.value);
    }

    const sortGames = (games, criteria, order) => {
        return [...games].sort((a,b) => {
            let comparison = 0;
            if(criteria === 'name') {
                comparison = a.name.localeCompare(b.name)
            }
            return  order === 'asc' ? comparison : -comparison;
        })
    }

    const displayedGames = filteredGames.length > 0 ? filteredGames : gameData;
    const sortedGames = sortGames(displayedGames, sortGame, sortOrder);

    return (
        <div>
            <h1>Game List</h1>

            <Search onSearch={handleSearch} />
            <SortGames 
                sortOrder={sortOrder}
                handlesSortOrderChange={handleSortOrderChange}
                />

            {err ? (<p>Error: {err}</p>) : (
                <div className="table-container">
                <table className="game-table">
                    <thead>
                        <tr>
                            <th>Icon</th>
                            <th>Title</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedGames.map((game) => (
                            <tr key={game.appid}>
                                <td className="icon">
                                    <img
                                        src={`http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`}
                                        alt="game icon"
                                    />
                                </td>
                                <td className="title">
                                    <Link className='link' to={`/games/${game.appid}`}>
                                        {game.name}
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            )}
        </div>
    );
}


export default Home;
