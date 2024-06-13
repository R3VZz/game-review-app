import React from "react";

const SortGames = ({ sortGame, handleSortChange, sortOrder, handlesSortOrderChange }) => {
    return(
        <div className="sort-menu">
            <label htmlFor="order">Order: </label>
            <select id="order" value={sortOrder} onChange={handlesSortOrderChange}>
                <option value="asc">Name A-Z</option>
                <option value="desc">Name Z-A</option>
            </select>
        </div>
    );
};
export default SortGames;
