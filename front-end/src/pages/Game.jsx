import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Reviews from '../components/reviews';

const Game = () => {
    const { id } = useParams();
    const [ game, setGame ] = useState(null);
    const [ err, setErr ] = useState(null);
    const [ loading, setLoading ] = useState(true);

    const getGame = async () => {
        try {
            let response = await fetch(`http://localhost:4000/api/games/${id}`)
            if (!response) {
                throw new Error(response.statusText)
            }
            let data = await response.json();
            setGame(data);
        } catch (err) {
            console.log(err.message)
            setErr(err.message)
        } finally {
            setLoading(false);
        }
    }

    useEffect( () => {
        getGame();
    }, [id])

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : err ? (
                <p>Error: {err}</p>
            ) : game ? (
                <div key={game.appid}>
                    <h2>{game.name}</h2>
                    <p>Total Playtime: { Math.floor(game.playtime_forever / 60) } hours</p>
                    <img 
                        src={`http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`}
                        alt="game icon"    
                    />
                    {/* add submit review component */}
                    {/* add review section component */}
                </div>
            ) : (
                <p>No game data available</p>
            )}
                <div>
                    <Reviews />        
                </div>
        </div>
    );
};

export default Game;
