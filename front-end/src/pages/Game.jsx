import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Reviews from '../components/reviews';
// import '../components/review-style.css'

const Game = () => {
    const { id } = useParams();
    const [game, setGame] = useState(null);
    const [err, setErr] = useState(null);
    const [loading, setLoading] = useState(true);

    const getGame = async () => {
        try {
            let response = await fetch(`http://localhost:4000/api/games/${id}`);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            let data = await response.json();
            setGame(data);
        } catch (err) {
            console.log(err.message);
            setErr(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getGame();
    }, [id]);

    return (
        <div className='review-page'>
            {loading ? (
                <p>Loading...</p>
            ) : err ? (
                <p>Error: {err}</p>
            ) : game ? (
                <div key={game.appid}>
                    <div className='game-info'>
                        <img
                            src={`http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`}
                            alt="game icon"
                        />
                        <h1 className='page-title'>{game.name}</h1>
                    </div>
                    <Reviews gameId={game.appid} />
                </div>
            ) : (
                <p>No game data available</p>
            )}
        </div>
    );
};

export default Game;

