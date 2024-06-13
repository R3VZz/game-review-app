import React from "react";

const SortGames = ({ sortGame, handleSortChange, sortOrder, handlesSortOrderChange }) => {
    return(
        <div>
            {/* <label htmlFor="sort">Sort By: </label>
            <select id="sort" value={sortGame} onChange={handleSortChange}>
                <option value="name">Name</option>
            </select> */}

            <label htmlFor="order">Order: </label>
            <select id="order" value={sortOrder} onChange={handlesSortOrderChange}>
                <option value="asc">Name A-Z</option>
                <option value="desc">Name Z-A</option>
            </select>
        </div>
    );
};
export default SortGames;