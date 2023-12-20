import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward } from '@fortawesome/free-solid-svg-icons';

function UserSkin() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch your data or set it statically
    // Example data:
    const exampleData = [
      { id: 1, name: 'John Doe', age: 25 },
      { id: 2, name: 'Jane Doe', age: 30 },
      { id: 1, name: 'John Doe', age: 25 },
      { id: 2, name: 'Jane Doe', age: 30 },

    ];

    setData(exampleData);
    setFilteredData(exampleData);
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = data.filter((item) =>
      Object.values(item)
        .join(' ')
        .toLowerCase()
        .includes(term)
    );

    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const renderTable = () => (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Skin ID</th>
          <th>User ID</th>
        </tr>
      </thead>
      <tbody>
        {currentItems.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.skinid}</td>
            <td>{item.userid}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderPagination = () => {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    if (totalPages <= 1) {
      return null;
    }

    return (
      <div className="page-nums">
        {Array.from({ length: totalPages }).map((_, index) => (
          <span
            key={index}
            onClick={() => paginate(index + 1)}
            style={{
              cursor: 'pointer',
              margin: '0 5px',
              fontWeight: currentPage === index + 1 ? 'bold' : 'normal',
            }}
          >
            {index + 1}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="case-management">
      <div className="back-button">
        <FontAwesomeIcon icon={faBackward} />
        <Link to="/AdminPanel">  Back to menu</Link>
      </div>
      <h2>User Management</h2>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
      />
      {renderTable()}
      {renderPagination()}
    </div>
  );
}

export default UserSkin;