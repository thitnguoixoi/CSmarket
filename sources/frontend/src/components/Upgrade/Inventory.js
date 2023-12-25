import React, { useState } from "react";

const Inventory = ({ items, onItemClick }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredItems, setFilteredItems] = useState(items);

    const handleItemClick = (selectedItem) => {
        onItemClick(selectedItem);
    };

    const handleSearchChange = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
        // Filter items based on the search term
        const filtered = items.filter(
            (item) =>
                item.name.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredItems(filtered);
    };

    return (
        <div className="inventory">
            <h2>Inventory</h2>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            <div className="items">
                <ul>
                    {filteredItems.map((item, index) => (
                        <li
                            key={index}
                            onClick={() => handleItemClick(item)}
                        >
                            {item.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Inventory;
