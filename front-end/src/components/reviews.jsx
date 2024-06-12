import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:4000';

const Reviews = () => {
    const [ reviews, setReviews ] = useState([]);
    const [ newReview, setNewReview ] = useState({ score: '', description: '', hoursPlayed: '' });
    const [ editReview, setEditReview ] = useState(null);

    useEffect( () => {
        // get existing reviews from the database
        axios.get(`${API_URL}/reviews`)
            .then(response => {
                console.log('Fetched reviews:', response.data.reviews);
                setReviews(Array.isArray(response.data.reviews) ? response.data.reviews : []);
            })
            .catch(err => console.error('Error fetching reviews:', err))
    }, [])

    const handleEdit = ( review ) => {
        setEditReview(review._id);
        setNewReview(review);
    }

    const handleSave = async () => {
        try {
            if (editReview !== null) {
                // edit an existing review
                await axios.patch(`${API_URL}/reviews/${editReview}`, newReview)
            } else {
                // add a new review
                await axios.post(`${API_URL}/reviews`, newReview)
            }
            // reset the form
            setNewReview({ score: '', description: '', hoursPlayed: '' });
            setEditReview(null);
            // fetch the updated reviews
            const response = await axios.get(`${API_URL}/reviews`);
            setReviews(Array.isArray(response.data.reviews) ? response.data.reviews : []);
        } catch (error) {
            console.error('Error saving review', error);
        }
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/reviews/${id}`);
            // fetch the updated review list
            const response = axios.get(`${API_URL}/reviews`);
            // update state after deleting and display remaining reviews
            setReviews(reviews.filter(review => review._id !== id));
        } catch (error) {
            console.error('Error deleting review', error)
        }
    }

    const handleChange = (e) => {
        setNewReview({
            ...newReview,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div>
            <h2>Reviews:</h2>
            <form onSubmit={(e) => {e.preventDefault(); handleSave(); }}>
                <div>
                    <label>
                        Score:
                        <input
                            type='number'
                            name='score'
                            value={newReview.score}
                            onChange={handleChange}
                            min="0"
                            max="100"
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Description:
                        <input  
                            name="description"
                            value={newReview.description}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div>
                <label>
                        Hours Played:
                        <input
                            type="number"
                            name="hoursPlayed"
                            value={newReview.hoursPlayed}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <button type='submit'>{editReview !== null ? 'Update' : 'Submit'}</button>
            </form>
            <ul>
                {reviews.map( (review, index) => (
                    <li key={review._id}>
                        <p>Score: {review.score}/100</p>
                        <p>Description: {review.description}</p>
                        <p>Hours Played: {review.hoursPlayed}</p>
                        <button onClick={ () => handleEdit(review)}>Edit</button>
                        <button onClick={ () => handleDelete(review._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Reviews;
