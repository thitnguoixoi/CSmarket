import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faPaintBrush, faPlus, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from "../../assets/setup/axios";
import Swal from 'sweetalert2';

function CaseManagement() {
  const [data, setData] = useState([]);
  //const for paginate and search system
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  //show when groudid is admin
  const [isAdmin, setIsAdmin] = useState(false);
  //const for add,edit,del item
  const [editedPrice, setEditedPrice] = useState('');
  const [showEditPrice, setShowEditPrice] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [caseSkinData, setCaseSkinData] = useState([]);
  const [editCaseSkinForm, setEditCaseSkinForm] = useState(false);
  const [showAddCaseSkinForm, setShowAddCaseSkinForm] = useState(false);
  const [caseid, setCaseId] = useState('');
  const [skinid, setSkinId] = useState('');
  const [percent, setPercent] = useState('');
  const [groupname, setGroupname] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  const Refresh = () => {
    //get case data
    axios.get(`/api/v1/cases`)
      .then(response => {
        console.log(response.data.DT);
        setData(response.data.DT);
        setFilteredData(response.data.DT);
      })
      .catch(error => {
        console.error('Error checking user group:', error);
      });
  }
  const ReFreshEditSkinForm = () => {
    //get case skins
    axios.get(`/api/v1/cases/id`, { params: { caseid: caseid } })
      .then(response => {
        setCaseSkinData(response.data.DT.skins);
      })
      .catch(error => {
        console.error('Error cases', error);
      });
  }
  const handleAddCaseSkin = (CaseID, SkinID, Percent) => {
    setShowAddCaseSkinForm(false); //hide form
    //data
    const dataToAdd = {
      caseid: parseInt(CaseID, 10),
      skinid: parseInt(SkinID, 10),
      percent: parseFloat(Percent)
    }
    //api add skin
    axios.post(`/api/v1/cases/skins/create`, dataToAdd)
      .then(response => {
        console.log('Add success');
        console.log(response);
      })
      .catch(error => {
        console.error('Error Add', error);
      });
    ReFreshEditSkinForm(); //refresh data after send api
  }
  const handleDelCaseSkin = (id) => {
    const dataToDel = {
      caseskinid: id,
    }
    //api to del skin with id
    axios.delete(`/api/v1/cases/skins/delete`, { data: dataToDel })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error('Error Add', error);
      });
    ReFreshEditSkinForm(); //refresh data after send api
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
    Refresh(); //refresh data after send api
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

  const handleShowAddCase = () => {
    setShowAddForm(!showAddForm);
  };
  const handleAddCase = (name, price, image, groupname) => {
    setShowAddForm(false); //hide add form  
    const caseAdd = {
      name: name,
      price: price,
      image: image,
      groupname: groupname
    }
    axios.post(`/api/v1/cases/create`, caseAdd)
      .then(response => {
        Refresh(); //refresh data if success
      })
  }
  const handleEditPrice = (itemId, price) => {
    setShowEditPrice(!showEditPrice); //hide edit input
    setSelectedItemId(itemId);  //set id,price for selected item
    setEditedPrice(price);
    const priceSend = parseInt(price, 10);
    const dataToSend = {
      caseid: itemId,
      price: priceSend
    }
    //api edit item 
    axios.put(`/api/v1/cases/update`, dataToSend)
      .then(response => {
        setShowEditPrice(false); //hide edit input if send api success
      })
      .catch(error => {
        console.error('Error update case price:', error);
      });
  };
  const handleEditCaseSkin = (caseID) => {
    setShowAddCaseSkinForm(false); //hide form
    setCaseId(caseID);
    //get case skins
    axios.get(`/api/v1/cases/id`, { params: { caseid: caseID } })
      .then(response => {
        setCaseSkinData(response.data.DT.skins);
      })
      .catch(error => {
        console.error('Error cases', error);
      });
    //show caseskin form
    setEditCaseSkinForm(!editCaseSkinForm);
  }
  const handleDeleteCase = (caseID) => {
    //api delete case with id
    axios.delete(`/api/v1/cases/delete`, { data: { caseid: caseID } })
      .then(response => {
        //alert delete case
        Swal.fire({
          title: "Delete!",
          text: "Case has been deleted!",
          icon: "success"
        });
        Refresh();  //refresh data when delete success
      })
      .catch(error => {
        console.error('Error cases', error);
      });
  }
  const renderAddCaseSkinForm = () => (
    <>
      <h3>Add Case Skin</h3>
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
      <br />
      <button onClick={() => { handleAddCaseSkin(caseid, skinid, percent); ReFreshEditSkinForm(); }}>
        Submit
      </button>
    </>
  );
  const renderEditCaseSkinTable = () => {
    return (
      <>
        <div className="header table">
          <h2>Case Skins</h2>
          <button onClick={() => { setShowAddCaseSkinForm(!showAddCaseSkinForm); }}>
            <FontAwesomeIcon icon={faPlus} /> Add Skin
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Case ID</th>
              <th>Skin ID</th>
              <th>Skin Name</th>
              <th>Percent</th>
              <th>
              </th>
            </tr>
          </thead>
          <tbody>
            {caseSkinData.map((item) => {
              // console.log(item);
              return (
                <tr key={item.id}>
                  <td>{item.CaseID}</td>
                  <td>{item.SkinID}</td>
                  <td>{item.Skin.Name}</td>
                  <td>{item.Percent}</td>
                  <td>
                    <button onClick={() => handleDelCaseSkin(item.id)}>
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
  const renderAddCaseForm = () => (
    <>
      <h3>Add Case</h3>
      <div>
        <label>Name:</label>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Group:</label>
        <input
          type="text"
          placeholder="Groupname"
          value={groupname}
          onChange={(e) => setGroupname(e.target.value)}
        />
      </div>
      <div>
        <label>Price:</label>
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div>
        <label>Image:</label>
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>
      <div>
        <button onClick={() => handleAddCase(name, price, image, groupname)}>
          Submit
        </button>
      </div>
    </>
  );

  const renderTable = () => (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Price</th>
          <th>Image</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {currentItems.map((item) => {
          // console.log(item.CaseID);
          return (
            <tr key={item.id}>
              <td>{item.CaseID}</td>
              <td>{item.Cases[0]?.Name}</td>
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
                    {item.Cases[0]?.Price}
                    <FontAwesomeIcon icon={faPaintBrush} />
                  </div>
                )}
              </td>
              <td>
                <img src={item.Cases[0]?.Image} alt="" />
              </td>
              <td>
                <button onClick={() => handleEditCaseSkin(item.id)}>Edit skin</button>
                <button onClick={() => handleDeleteCase(item.CaseID)}>
                  <FontAwesomeIcon icon={faTrash} />
                  Delete
                </button>
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
          {showAddForm && renderAddCaseForm()}
          <div className="back-button">
            <FontAwesomeIcon icon={faBackward} />
            <Link to="/admin">  Back to menu</Link>
          </div>

          <div className="header table">
            <h2>Case Management</h2>
            <button onClick={() => handleShowAddCase()}>
              <FontAwesomeIcon icon={faPlus} /> Add Case
            </button>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

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
