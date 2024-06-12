const API_URL = `http://localhost:4000`;

export const deleteReview = async (review) => {
    const response = await fetch(`${API_URL}/reviews/${review._id}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json'
        }
    })
    const json = await response.json();
    return json;
}
