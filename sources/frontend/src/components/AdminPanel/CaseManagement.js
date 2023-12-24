import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faPaintBrush, faPlus, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
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
  const [caseSkinData, setCaseSkinData] = useState([]);
  const [editCaseSkinForm, setEditCaseSkinForm] = useState(false);
  const [showAddCaseSkinForm, setShowAddCaseSkinForm] = useState(false);
  const [caseid, setCaseId] = useState('');
  const [skinid, setSkinId] = useState('');
  const [percent, setPercent] = useState('');

  const handleAddCaseSkin = (CaseID, SkinID, Percent) => {
    const dataToAdd = {
      caseid: parseInt(CaseID, 10),
      skinid: parseInt(SkinID, 10),
      percent: parseFloat(Percent)
    }
    console.log(dataToAdd);
    axios.post(`/api/v1/cases/skins/create`, dataToAdd)
      .then(response => {
        console.log('Add success');
        console.log(response);
      })
      .catch(error => {
        console.error('Error Add', error);
      });
  }
  const handleDelCaseSkin = (CaseID, SkinID) => {
    // Add your logic for the action here
    const dataToDel = {
      caseid: CaseID,
      skinid: SkinID
    }
    axios.delete(`/api/v1/cases/skins/delete`, { data: dataToDel })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error('Error Add', error);
      });
  };
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
        setShowEditPrice(false);
      })
      .catch(error => {
        console.error('Error update case price:', error);
      });
  };
  const handleEditCaseSkin = (caseID) => {
    //get case skins
    axios.get(`/api/v1/cases/id`, { params: { caseid: caseID } })
      .then(response => {
        console.log(response.data.DT);
        setCaseSkinData(response.data.DT.skins);
      })
      .catch(error => {
        console.error('Error cases', error);
      });
    //show caseskin form
    setEditCaseSkinForm(!editCaseSkinForm);
    console.log(caseSkinData);
  }
  const [isPlus, setIsPlus] = useState(true);
  const handleClickAddButton = () => {
    setIsPlus((prevIsPlus) => !prevIsPlus);
  };
  const renderAddCaseSkinForm = () => (
    <>
      <h3>Add Case Skin</h3>
      <input
        placeholder="Case ID"
        type="text"
        value={caseid}
        onChange={(e) => {
          const numericValue = e.target.value.replace(/[^-0-9]/g, '');
          setCaseId(numericValue);
        }}
      />
      <br />
      <input
        placeholder="Skin ID"
        type="text"
        value={skinid}
        onChange={(e) => {
          const numericValue = e.target.value.replace(/[^-0-9]/g, '');
          setSkinId(numericValue);
        }}
      />
      <br />
      <input
        placeholder="Percent"
        type="text"  // Use type "text" to allow decimal points
        value={percent}
        onChange={(e) => {
          const numericValue = e.target.value.replace(/[^-0-9.]/g, '');  // Allow digits and a decimal point
          setPercent(numericValue);
        }}
      />
      <br />
      <button onClick={() => handleAddCaseSkin(caseid, skinid, percent)}>
        Submit
      </button>
    </>
  );
  const renderEditCaseSkinTable = () => {
    return (
      <>
        <h2>Case Skins</h2>
        <table>
          <thead>
            <tr>
              <th>Case ID</th>
              <th>Skin ID</th>
              <th>Skin Name</th>
              <th>Percent</th>
              <th>
                <button onClick={() => { setShowAddCaseSkinForm(!showAddCaseSkinForm) }}>
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {caseSkinData.map((item, index) => {
              // console.log(index);
              return (
                <tr key={item.id}>
                  <td>{item.CaseID}</td>
                  <td>{item.SkinID}</td>
                  <td>{item.Skin.Name}</td>
                  <td>{item.Percent}</td>
                  <td>
                    <button onClick={() => handleDelCaseSkin(item.CaseID, item.SkinID)}>
                      <FontAwesomeIcon icon={faTrash} />
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}

          </tbody>
        </table>
      </>
    );
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
                <button onClick={() => handleEditCaseSkin(item.id)}>Edit skin</button>
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
          {showAddCaseSkinForm && renderAddCaseSkinForm()}
          {editCaseSkinForm && renderEditCaseSkinTable()}
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
