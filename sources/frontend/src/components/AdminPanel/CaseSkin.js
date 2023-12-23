import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from "../../assets/setup/axios"

function CaseSkin() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        // Fetch your data or set it statically
        // Example data:
        const exampleData = [
            { group: "free", id: 1, name: 'John Doe', age: 25 },
            { group: "free", id: 2, name: 'Jane Doe', age: 30 },
            { group: "free", id: 1, name: 'John Doe', age: 25 },
            { group: 2, id: 2, name: 'Jane Doe', age: 30 },
        ];

        setData(exampleData);
        setFilteredData(exampleData);
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
                    <th>CaseID</th>
                    <th>SkinID</th>
                    <th>Percent</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {currentItems.map((item, index) => (
                    <tr key={item.id}>
                        <td>{item.caseid}</td>
                        <td>{item.skinid}</td>
                        <td>{item.percent}</td>
                        <td>delete</td>
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
        <div className="case-skins">
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

export default CaseSkin;
