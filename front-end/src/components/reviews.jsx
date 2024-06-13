import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:4000';

const Reviews = ({ gameId }) => {
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ score: '', description: '', hoursPlayed: '', gameId });
    const [editReview, setEditReview] = useState(null);

    useEffect(() => {
        if (gameId) {
            // get reviews for the specific game
            axios.get(`${API_URL}/reviews/game/${gameId}`)
                .then(response => {
                    setReviews(Array.isArray(response.data.reviews) ? response.data.reviews : []);
                })
                .catch(err => console.error('Error fetching reviews:', err));
        }
    }, [gameId]);

    const handleEdit = (review) => {
        setEditReview(review._id);
        setNewReview({ ...review, gameId });
    };

    const handleSave = async () => {
        try {
            if (editReview !== null) {
                // edit an existing review
                await axios.patch(`${API_URL}/reviews/${editReview}`, { ...newReview, gameId });
            } else {
                // add a new review
                await axios.post(`${API_URL}/reviews`, { ...newReview, gameId });
            }
            // reset the form
            setNewReview({ score: '', description: '', hoursPlayed: '', gameId });
            setEditReview(null);
            // fetch the updated reviews
            const response = await axios.get(`${API_URL}/reviews/game/${gameId}`);
            setReviews(Array.isArray(response.data.reviews) ? response.data.reviews : []);
        } catch (error) {
            console.error('Error saving review', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/reviews/${id}`);
            // update state after deleting and display remaining reviews
            setReviews(reviews.filter(review => review._id !== id));
        } catch (error) {
            console.error('Error deleting review', error);
        }
    };

    const handleChange = (e) => {
        setNewReview({
            ...newReview,
            [e.target.name]: e.target.value,
        });
    };

    const renderForm = (isEdit = false) => (
        <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
            <div className='review-form'>
                <label>
                    Score:
                    <input
                        name="score"
                        value={newReview.score}
                        onChange={handleChange}
                        min="0"
                        max="100"
                        placeholder='input score between 0-100'
                        required
                    />
                </label>
            </div>
            <div className='review-form'>
                <div className='description-container'>
                    <label>
                        Description:
                    </label>
                    <textarea
                        name="description"
                        value={newReview.description}
                        onChange={handleChange}
                        placeholder='Share your thoughts'
                        required
                    />
                </div>
            </div>
            <div className='review-form'>
                <label>
                    Hours Played:
                    <input
                        name="hoursPlayed"
                        value={newReview.hoursPlayed}
                        onChange={handleChange}
                        placeholder='How many hours have you played'
                        min="0"
                        required
                    />
                </label>
            </div>
            <button type="submit">{isEdit ? 'Update' : 'Submit'}</button>
        </form>
    );

    return (
        <div>
            <h2>Reviews:</h2>
            {renderForm()}
            <ul className='review-list'>
                {reviews.map((review) => (
                    <li key={review._id} className='review-card'>
                        <div>
                            <div className='review-score'>
                                <h3>Score:</h3>
                                <p>{review.score}/100</p>
                            </div>
                            <div className='review-description'>
                                <h3>Description:</h3>
                                <p>{review.description}</p>
                            </div>
                            <div className='review-hours'>
                                <h3>Hours Played:</h3>
                                <p>{review.hoursPlayed}</p>
                            </div>
                            <div className='buttons'>
                                <button onClick={() => handleEdit(review)}>Edit</button>
                                <button onClick={() => handleDelete(review._id)}>Delete</button>
                            </div>
                            {editReview === review._id && renderForm(true)}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Reviews;
