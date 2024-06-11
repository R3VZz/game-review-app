import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const [gameData, setGameData] = useState([]);
    const [err, setErr] = useState(null);

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

    return (
        <div>
            <h1>Game List</h1>
            {err ? (<p>Error: {err}</p>) : (
                <div className="game-info">
                    {gameData.length > 0 ? (
                        gameData.map((game) => (
                            <div className="info" key={game.appid}>
                                <Link className='link' to={`/games/${game.appid}`}>
                                    <p>{game.name}</p>
                                </Link>
                            </div>
                        ))
                    ) : (<p>No games found</p>)
                    }
                </div>
            )}
        </div>
    );
}

export default Home;
