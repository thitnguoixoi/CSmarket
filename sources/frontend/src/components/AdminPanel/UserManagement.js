import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faPlus, faTimes, faTrash, faRefresh, faUser } from '@fortawesome/free-solid-svg-icons';
import axios from "../../assets/setup/axios"

function UserManagement() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [clickedItemId, setClickedItemId] = useState(null);
  const [isPlus, setIsPlus] = useState(true);
  const [walletInputValue, setWalletInputValue] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);


  useEffect(() => {
    // Fetch data from the API using Axios
    axios.get('/api/v1/users')
      .then(response => {
        setData(response.data.DT);
        setFilteredData(response.data.DT);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    const storedUser = sessionStorage.getItem('steamprofile');
    // Parse data from sessionStorage
    const tmp = JSON.parse(storedUser);

    // Send Axios request to check user's group ID
    axios.get(`/api/v1/users/steamid`, { params: { steamid: tmp.steamid } })
      .then(response => {
        if (response.data.DT.GroupID === 3) {
          setIsAdmin(true);
        }
      })
      .catch(error => {
        console.error('Error checking user group:', error);
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
  }
  const handleDel = (itemId) => {
    // Send Axios request to delete item with the specified ID
    axios.delete(`/api/v1/users/delete`, { data: { id: itemId } })
      .then(response => {
        console.log('Item deleted successfully:');
        axios.get('/api/v1/users')
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

  const refresh = () => {
    axios.get('/api/v1/users')
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
    axios.put('/api/v1/users/update/wallet', dataToSend)
      .then(response => {
        console.log('Wallet added successfully:');
        // After submitting, you may want to refresh the data
        axios.get('/api/v1/users')
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
  const handleSetMod = (itemId) => {
    // Send Axios request to set the user as a moderator
    axios.put(`/api/v1/users/setmod/${itemId}`)
      .then(response => {
        console.log('User set as moderator successfully:', response);
        // If you need to update the data after setting the user as a moderator, you can call the refresh function
        refresh();
      })
      .catch(error => {
        console.error('Error setting user as moderator:', error);
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
                  <FontAwesomeIcon icon={(clickedItemId === item.id) && isPlus ? faTimes : faPlus} />
                  Wallet
                </button>
                <button onClick={() => handleSetMod(item.id)}>
                  <FontAwesomeIcon icon={faUser} />
                  +Mod
                </button>
                <button onClick={() => handleDel(item.id)}>
                  <FontAwesomeIcon icon={faTrash} />
                  Delete
                </button>
                {(clickedItemId === item.id) && (
                  <div>
                    <input
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
      {isAdmin ? (
        <>
          <div className="back-button">
            <FontAwesomeIcon icon={faBackward} />
            <Link to="/admin">Back to menu</Link>
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
        </>
      ) : (
        <div className="not-admin">
          <p>You do not have permission to access this page.</p>
          <Link to="/">Go back to homepage</Link>
        </div>
      )}
    </div>
  );

}

export default UserManagement;
