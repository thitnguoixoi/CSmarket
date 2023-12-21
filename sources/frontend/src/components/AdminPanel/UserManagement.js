import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faPlus, faTimes, faTrash, faRefresh } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'; // Import Axios library

function UserManagement() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [clickedItemId, setClickedItemId] = useState(null);
  const [showInput, setShowInput] = useState(false);
  const [isPlus, setIsPlus] = useState(true);
  const [walletInputValue, setWalletInputValue] = useState('');


  useEffect(() => {
    // Fetch data from the API using Axios
    axios.get('http://localhost:8080/api/v1/users')
      .then(response => {
        setData(response.data.DT);
        setFilteredData(response.data.DT);
        console.log(response.data.DT);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

  }, []); // Empty dependency array ensures the effect runs only once, similar to componentDidMount

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

  const handleClick = (itemId) => {
    setClickedItemId(itemId);
    handleClickAddButton();
  }
  const handleDel = (itemId) => {
    console.log(itemId);
    // Send Axios request to delete item with the specified ID
    axios.delete(`http://localhost:8080/api/v1/users/delete`, { data: { id: itemId } })
      .then(response => {
        console.log('Item deleted successfully:', response);
        // After deleting, you may want to refresh the data
        // For example, you can fetch the updated data again
        axios.get('http://localhost:8080/api/v1/users')
          .then(response => {
            setData(response.data.DT);
            setFilteredData(response.data.DT);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      })
      .catch(error => {
        console.error('Error deleting item:', error);
      });
  };
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handleClickAddButton = () => {
    setIsPlus((prevIsPlus) => !prevIsPlus);
    if (!isPlus) {
      setShowInput(true);
    } else {
      setShowInput(false);
    }
  };
  const refresh = () => {
    axios.get('http://localhost:8080/api/v1/users')
      .then(response => {
        setData(response.data.DT);
        setFilteredData(response.data.DT);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddWalletSubmit = (itemId, inputValue) => {
    // Implement your logic for handling wallet submission
    setIsSubmitting(true);

    // Example: Send Axios request or perform other actions
    const dataToSend = {
      id: itemId,
      walletValue: inputValue,
    };

    axios.post('http://localhost:8080/api/v1/users/addWallet', dataToSend)
      .then(response => {
        console.log('Wallet added successfully:', response);

        // After submitting, you may want to refresh the data
        axios.get('http://localhost:8080/api/v1/users')
          .then(response => {
            setData(response.data.DT);
            setFilteredData(response.data.DT);
            setIsSubmitting(false);
            setClickedItemId(null); // Close the input field after submitting
          })
          .catch(error => {
            console.error('Error fetching data:', error);
            setIsSubmitting(false);
          });
      })
      .catch(error => {
        console.error('Error adding wallet:', error);
        setIsSubmitting(false);
      });
  };

  const renderTable = () => (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Steam ID</th>
          <th>TradeURL</th>
          <th>Wallet</th>
          <th>CountOpen</th>
          <th>CountUpgrade</th>
          <th>Role</th>
          <th>
            Action
            <button onClick={() => refresh()}>
              <FontAwesomeIcon icon={faRefresh} />
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {currentItems.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.SteamID}</td>
            <td>{item.TradeURL}</td>
            <td>{item.Wallet}</td>
            <td>{item.CountOpen}</td>
            <td>{item.CountOpen}</td>
            <td>{item.Group_User?.Name ? item.Group_User.Name : ''}</td>
            <td>
              <div>
                <button onClick={() => handleClick(item.id)}>
                  <FontAwesomeIcon icon={(clickedItemId === item.id) && isPlus ? faTimes : faPlus} />Wallet
                </button>
                <button onClick={() => handleDel(item.id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
                {(clickedItemId === item.id) && (
                  <div>
                    <input
                      type="text"
                      placeholder="Add Wallet"
                      value={walletInputValue}
                      onChange={(e) => setWalletInputValue(e.target.value)}
                    />
                    <button onClick={() => handleAddWalletSubmit(item.id, walletInputValue)}>
                      Submit
                    </button>
                  </div>
                )}
              </div>
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

export default UserManagement;
