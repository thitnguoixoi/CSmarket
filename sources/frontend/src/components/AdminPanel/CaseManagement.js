import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faPaintBrush, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from "../../assets/setup/axios"

function CaseManagement() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [editedPrice, setEditedPrice] = useState('');
  const [showEditPrice, setShowEditPrice] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  useEffect(() => {
    //set role
    axios.get(`/api/v1/users/steamid`)
      .then(response => {
        if (response.data.DT.GroupID === 3) {
          setIsAdmin(true);
        }
      })
      .catch(error => {
        console.error('Error checking user group:', error);
      });

    //get case data
    axios.get(`/api/v1/cases`)
      .then(response => {
        setData(response.data.DT);
        setFilteredData(response.data.DT);
      })
      .catch(error => {
        console.error('Error checking user group:', error);
      });

    // //get case skins
    // axios.get(`/api/v1/cases/id`)
    //   .then(response => {
    //     console.log(response);
    //   })
    //   .catch(error => {
    //     console.error('Error cases', error);
    //   });
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

  const handleAddCase = () => {
    handleClickAddButton();
    setShowAddForm(!showAddForm);
  };
  const handleEditPrice = (itemId, price) => {
    setShowEditPrice(!showEditPrice);
    setSelectedItemId(itemId);
    setEditedPrice(price);
    const priceSend = parseInt(price, 10);
    const dataToSend = {
      caseid: itemId,
      price: priceSend
    }
    console.log(dataToSend);
    axios.put(`/api/v1/cases/update`, dataToSend)
      .then(response => {
        console.log('update price', response);
      })
      .catch(error => {
        console.error('Error update case price:', error);
      });

  };
  const [isPlus, setIsPlus] = useState(true);
  const handleClickAddButton = () => {
    setIsPlus((prevIsPlus) => !prevIsPlus);
  };

  const renderTable = () => (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Price</th>
          <th>Image</th>
          <th>
            <button onClick={handleAddCase}>
              <FontAwesomeIcon icon={isPlus ? faPlus : faTimes} />
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {currentItems.map((item) => {
          // console.log(item);
          return (
            <tr key={item.id}>
              <td>{item.CaseID}</td>
              <td>{item.Name}</td>
              <td>
                {selectedItemId === item.id ? (
                  <div>
                    <input
                      type="number"
                      value={editedPrice}
                      onChange={(e) => setEditedPrice(e.target.value)}
                    />
                    <button onClick={() => { handleEditPrice(item.id, editedPrice) }}>Submit</button>
                  </div>
                ) : (
                  <div onClick={() => handleEditPrice(item.id, item.Cases[0].Price)}>
                    {item.Cases[0].Price}
                    <FontAwesomeIcon icon={faPaintBrush} />
                  </div>
                )}
              </td>
              <td>
                <img src={item.Cases[0].Image} alt="" />
              </td>
              <td>
                <button>Edit skin</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table >
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
      {isAdmin ? (
        <>
          <div className="back-button">
            <FontAwesomeIcon icon={faBackward} />
            <Link to="/admin">  Back to menu</Link>
          </div>

          <h2>Case Management</h2>
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

export default CaseManagement;
