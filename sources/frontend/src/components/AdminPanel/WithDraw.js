import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faCheck } from '@fortawesome/free-solid-svg-icons';
import axios from "../../assets/setup/axios"

function Withdraw() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMod, setIsMod] = useState(false);

  useEffect(() => {
    //check role
    axios.get(`/api/v1/users/steamid`)
      .then(response => {
        if (response.data.DT.GroupID === 3) {
          setIsAdmin(true);
        } else if (response.data.DT.GroupID === 2) {
          setIsMod(true);
        }
      })
      .catch(error => {
        console.error('Error checking user group:', error);
      });

    //get data
    axios.get(`/api/v1/skins/withdraw`)
      .then(response => {
        setData(response.data.DT);
        setFilteredData(response.data.DT);
      })
      .catch(error => {
        console.error('Error get data:', error);
      });
  }, []);
  const Check = (skinID) => {
    console.log(skinID);
    //change status
    axios.put(`/api/v1/skins/withdraw/update`, { skinid: skinID, isAccept: 1 })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error('Error get data:', error);
      });
  }
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
          <th>SteamID</th>
          <th>TradeURL</th>
          <th>Skin</th>
          <th>Float</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {currentItems.map((item) => {
          // console.log(item);
          return (
            <tr key={item.id}>
              <td>{item.User.SteamID}</td>
              <td>{item.User.TradeURL}</td>
              <td>{item.Skin.Name}</td>
              <td>{item.Skin.Float}</td>
              <td>
                <button onClick={() => Check(item.SkinID)}>
                  <FontAwesomeIcon icon={faCheck} />
                </button>
              </td>
            </tr>
          );
        })}
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

      {(isAdmin || isMod) ? (
        <>
          <div className="back-button">
            <FontAwesomeIcon icon={faBackward} />
            <Link to="/admin">Back to menu</Link>
          </div>
          <h2>WithDraw</h2>
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

export default Withdraw;
