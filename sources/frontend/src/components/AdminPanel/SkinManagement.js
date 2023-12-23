import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faPlus, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import AddSkinForm from "./AddSkinForm";
import axios from "../../assets/setup/axios"

function SkinManagement() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    axios.get(`/api/v1/skins`)
      .then(response => {
        setData(response.data.DT);
        setFilteredData(response.data.DT);
      })
    // Send Axios request to check user's group ID
    axios.get(`/api/v1/users/steamid`)
      .then(response => {
        if (response.data.DT.GroupID === 3) {
          setIsAdmin(true);
        }
      })
      .catch(error => {
        console.error('Error checking user group:', error);
      });
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

  const handleAddSkin = () => {
    setShowAddForm(!showAddForm);
  };
  const handleDeleteSkin = (id) => {
    console.log(id);
    const dataDel = {
      skinid: id
    }
    axios.delete(`/api/v1/skins/delete`,dataDel)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error('Error deleting item:', error);
      });
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
          <th>Name</th>
          <th>Float</th>
          <th>Tier</th>
          <th>Image</th>
          <th>Count</th>
          <th>
            <button onClick={handleAddSkin}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {currentItems.map((item) => (
          <tr key={item.SkinID}>
            <td>{item.id}</td>
            <td>{item.Name}</td>
            <td>{item.Float}</td>
            <td>{item.Tier}</td>
            <td>{item.Image}</td>
            <td>{item.Count}</td>
            <td>
              <button onClick={()=>handleDeleteSkin(item.id)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </td>
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

    <div className="skin-management">
      {isAdmin ? (
        <>
          {showAddForm && <AddSkinForm />}
          <div className="back-button">
            <FontAwesomeIcon icon={faBackward} />
            <Link to="/admin">  Back to menu</Link>
          </div>
          <h2>Skin Management</h2>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
          />
          {renderTable()}
          {renderPagination()}
        </>
      ) : (
        <div className="not-admin">
          <a>You do not have permission to access this page.</a>
          <Link to="/">Go back to homepage</Link>
        </div>
      )}

    </div>
  );
}

export default SkinManagement;
