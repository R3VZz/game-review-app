const API_URL = `http://localhost:4000`;

export const getOneReview = async (id) => {
    const response = await fetch(`${API_URL}/reviews/${id}`);
    if (!response) {
        throw new Error("Error: Response not okay");
    };

    const json = await response.json();
    return json;
}
