import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faPlus, faTrash, faRefresh, faUser } from '@fortawesome/free-solid-svg-icons';
import axios from "../../assets/setup/axios"

function UserManagement() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [clickedItemId, setClickedItemId] = useState(null);
  const [walletInputValue, setWalletInputValue] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAddWallet, setShowAddWallet] = useState(false);
  const [showGroupOption, setShowGroupOption] = useState(false);
  const [selectedOption, setSelectedOption] = useState("1");

  // Add this function to handle radio button changes
  const handleRadioChange = (value) => {
    setSelectedOption(value);
  };

  useEffect(() => {
    // Fetch data from api
    axios.get('/api/v1/users')
      .then(response => {
        setData(response.data.DT);
        setFilteredData(response.data.DT);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    //api set role 
    axios.get(`/api/v1/users/steamid`)
      .then(response => {
        if (response.data.DT.GroupID === 3) {
          setIsAdmin(true);
        }
      })
      .catch(error => {
        console.error('Error checking user group:', error);
      });
  }, []); // Empty dependency array ensures the effect runs only once

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
  const handleClickGroup = (itemId) => {
    setShowGroupOption(!showGroupOption)
    handleClick(itemId);
  }
  const handleClickAddWallet = (itemId) => {
    setShowAddWallet(!showAddWallet)
    handleClick(itemId);
  }
  const handleDel = (itemId) => {
    // api delete user with id
    axios.delete(`/api/v1/users`, { data: { id: itemId } })
      .then(response => {
        //refresh data when delete success
        refresh();
      })
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const refresh = () => {
    //api refress data
    axios.get('/api/v1/users')
      .then(response => {
        setData(response.data.DT);
        setFilteredData(response.data.DT);
      })
  }

  const handleAddWalletSubmit = (itemId, inputValue) => {
    // Implement your logic for handling wallet submission
    // Example: Send Axios request or perform other actions
    const dataToSend = {
      id: itemId,
      walletValue: inputValue,
    };
    //api update wallet
    axios.put('/api/v1/users/wallet', dataToSend)
      .then(response => {
        // After submitting, refresh the data
        axios.get('/api/v1/users')
          .then(response => {
            //refresh data
            setData(response.data.DT);
            setFilteredData(response.data.DT);
            setClickedItemId(null); // Close the input field after submitting
          })
      })
  };
  const handleDropdownChange = (value) => {
    setSelectedOption(value);
  };
  const handleSetMod = (itemId, selectedOption) => {
    setClickedItemId(null);
    const groupId = parseInt(selectedOption, 10);
    const dataSetGroup = {
      id: itemId,
      groupid: groupId
    }
    // Send Axios request to set the user as a moderator
    axios.put(`/api/v1/users/group`, dataSetGroup)
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
          <th>Group</th>
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
                <button onClick={() => handleClickAddWallet(item.id)}>
                  <FontAwesomeIcon icon={faPlus} />
                  Wallet
                </button>
                <button onClick={() => handleClickGroup(item.id)}>
                  <FontAwesomeIcon icon={faUser} />
                  +Group
                </button>
                {clickedItemId === item.id && showGroupOption && (
                  <div id="submit-set-group">
                    <label>
                      <input
                        type="radio"
                        value="1"
                        checked={selectedOption === "1"}
                        onChange={() => handleRadioChange("1")}
                      />
                      User
                    </label>

                    <label>
                      <input
                        type="radio"
                        value="2"
                        checked={selectedOption === "2"}
                        onChange={() => handleRadioChange("2")}
                      />
                      Trader
                    </label>

                    <label>
                      <input
                        type="radio"
                        value="3"
                        checked={selectedOption === "3"}
                        onChange={() => handleRadioChange("3")}
                      />
                      Admin
                    </label>

                    <button onClick={() => handleSetMod(item.id, selectedOption)}>
                      Submit
                    </button>
                  </div>
                )}


                <button onClick={() => handleDel(item.id)}>
                  <FontAwesomeIcon icon={faTrash} />
                  Delete
                </button>
                {(clickedItemId === item.id) && showAddWallet && (
                  <div>
                    <input
                      placeholder="Add Wallet"
                      value={walletInputValue}
                      onChange={(e) => {
                        // Use a regular expression to allow only numeric characters and a minus sign
                        const numericValue = e.target.value.replace(/[^-0-9]/g, '');
                        setWalletInputValue(numericValue);
                      }}
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
