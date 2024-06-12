const API_URL = 'http://localhost:4000';

export const getReviews = async () => {
    let response = await fetch(`${API_URL}/reviews`);
    if (!response) {
        throw new Error(`Error: ${response.status}`)
    }
    let data = await response.json();
    return data;
};
