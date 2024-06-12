const API_URL = 'http://localhost:4000';

export const addReview = async ( review ) => {
    let obj =
    {
        score: review,
        description: review,
        hoursPlayed: review
    };

    const response = await fetch(`${API_URL}/reviews`, {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-type': 'application/json'
        }
    });
    const json = await response.json();
    return json;
}
