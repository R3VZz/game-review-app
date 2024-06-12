import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Search from "../components/search-games";

const Home = () => {
    const [gameData, setGameData] = useState([]);
    const [err, setErr] = useState(null);
    const [filteredGames, setFilteredGames] = useState([]);

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

    return (
        <div>
            <h1>Game List</h1>
            <Search onSearch={handleSearch} />
            {err ? (<p>Error: {err}</p>) : (
                <div className="game-info">
                    {(filteredGames.length > 0 ? filteredGames : gameData).map((game) => (
                        <div className="info" key={game.appid}>
                            <Link className='link' to={`/games/${game.appid}`}>
                                <div className="game-container">
                                    <div className="icon">
                                        <img 
                                            src={`http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`}
                                            alt="game icon"    
                                        />
                                    </div>
                                    <div className="title">
                                        <p>{game.name}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}


export default Home;
