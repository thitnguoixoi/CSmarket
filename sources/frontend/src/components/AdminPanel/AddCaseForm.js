import React, { useState } from 'react';

const AddCaseForm = ({ AddCase }) => {
  const [formData, setFormData] = useState({
    group: '',
    id: '',
    name: '',
    price: '',
    image: '',
    counts: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    AddCase(formData);
    setFormData({
      group: '',
      id: '',
      name: '',
      price: '',
      image: '',
      counts: '',
    });
  };

  return (
    <div className="add-form">
      <h3>Add Case</h3>
      <form>
        <label htmlFor="group">Group:</label>
        <input id="text" group="group" name="group" value={formData.group} onChange={handleChange} required />

        <label htmlFor="id">ID:</label>
        <input id="text" group="id" name="id" value={formData.id} onChange={handleChange} required />

        <label htmlFor="name">Name:</label>
        <input id="text" group="name" name="name" value={formData.name} onChange={handleChange} required />

        <label htmlFor="tier">Tier:</label>
        <input id="text" group="tier" name="tier" value={formData.tier} onChange={handleChange} required />

        <label htmlFor="image">Image:</label>
        <input id="text" group="image" name="image" value={formData.image} onChange={handleChange} required />

        <label htmlFor="counts">Count:</label>
        <input id="text" group="counts" name="counts" value={formData.counts} onChange={handleChange} required />

        <button id="button" onClick={handleSubmit}>
          Add Case
        </button>
      </form>
    </div>
  );
};

export default AddCaseForm;
