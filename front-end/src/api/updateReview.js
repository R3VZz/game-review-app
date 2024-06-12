const API_URL = `http:localhost:4000`

export const updateReview = async (review) => {
    let obj =
    {
        score: review,
        description: review,
        hoursPlayed: review
    };
    console.log(obj);

    const response = await fetch(`${API_URL}/reviews/${review._id}`, {
        method: 'PATCH',
        heaaders: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(obj)
    });
    if (!response) {
        throw new Error("Error: response not okay")
    }
    const json = await response.json();
    return json;
}
