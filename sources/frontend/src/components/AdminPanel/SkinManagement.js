import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faPlus, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import axios from "../../assets/setup/axios"

function SkinManagement() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [countInputValue, setCountInputValue] = useState('');
  const [showAddCountForm, setShowAddCountForm] = useState(false);
  const [addingCountForItemId, setAddingCountForItemId] = useState(null);

  const refresh = () => {
    axios.get(`/api/v1/skins`)
      .then(response => {
        setData(response.data.DT);
        setFilteredData(response.data.DT);
      })
  }

  const handleShowInputCount = (itemId) => {
    setShowAddCountForm(true);
    setAddingCountForItemId(itemId);
  };
  const handleAddCountSubmit = (id, countInputValue) => {
    // Your logic for handling count input submission goes here
    setShowAddCountForm(false);
    setCountInputValue('');

    const dataUpdate = {
      skinid: id,
      addcount: parseInt(countInputValue, 10)
    }
    console.log(dataUpdate);
    axios.put(`/api/v1/skins/update`, dataUpdate)
      .then(response => {
        console.log(response);
      })
    refresh();
  };
  useEffect(() => {
    refresh();
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
  const handleSubmit = (name, price, float, tier, image, count) => {
    // Xử lý dữ liệu khi người dùng nhấn nút Submit
    setShowAddForm(false);
    const addData = {
      name: name,
      price: price,
      float: float,
      tier: tier,
      image: image,
      count: count
    }
    // Gọi API hoặc xử lý khác theo yêu cầu của bạn
    axios.post(`/api/v1/skins/create`, addData)
      .then(response => {
        console.log('Add success');
      })
      .catch(error => {
        console.error('Error Add', error);
      });

    refresh();
  };
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

    const dataDel = {
      data: {
        skinid: id
      }
    }
    console.log(dataDel);
    axios.delete(`/api/v1/skins/delete`, dataDel)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error('Error deleting item:', error);
      });

    refresh();
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
          <th>Price</th>
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
            <td>{item.Price}$</td>
            <td>{item.Tier}</td>
            <td>{item.Image}</td>
            <td>{item.Count}
              <div>
                <button onClick={() => handleShowInputCount(item.id)}>
                  <FontAwesomeIcon icon={faPlus} />
                </button>
                {showAddCountForm && addingCountForItemId === item.id && (
                  <>
                    <input
                      placeholder="Add Count"
                      value={countInputValue}
                      onChange={(e) => {
                        const numericValue = e.target.value.replace(/[^-0-9]/g, '');
                        setCountInputValue(numericValue);
                      }}
                    />
                    <button onClick={() => handleAddCountSubmit(item.id, countInputValue)}>
                      Submit
                    </button>
                  </>
                )}
              </div>
            </td>
            <td>
              <button onClick={() => handleDeleteSkin(item.id)}>
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

  const [selectedTier, setSelectedTier] = useState('1');
  const handleTierChange = (event) => {
    setSelectedTier(event.target.value);
  };
  const AddSkinForm = () => (
    <div className="add-form">
      <h3>Add Skin</h3>
      <form>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required />

        <label htmlFor="price">Price:</label>
        <input type="number" id="price" name="price" required />

        <label htmlFor="float">Float:</label>
        <input type="number" id="float" name="float" step="0.01" required />

        <div className="tier-container">
          <label>Tier:</label>
          {[1, 2, 3, 4, 5].map((value) => (
            <label key={value}>
              <input
                type="radio"
                name="tier"
                value={value.toString()}
                checked={selectedTier === value.toString()}
                onChange={handleTierChange}
              />
              {value}
            </label>
          ))}
        </div>

        <label htmlFor="image">Image:</label>
        <input type="text" id="image" name="image" required />

        <label htmlFor="count">Count:</label>
        <input type="number" id="count" name="count" required />

        <button type="button" onClick={() => handleSubmit(
          document.getElementById('name').value,
          document.getElementById('price').value,
          document.getElementById('float').value,
          selectedTier,
          document.getElementById('image').value,
          document.getElementById('count').value
        )}>
          Add Skin
        </button>
      </form>
    </div>
  );
  return (
    < div className="skin-management">
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

    </div >
  );
}

export default SkinManagement;
