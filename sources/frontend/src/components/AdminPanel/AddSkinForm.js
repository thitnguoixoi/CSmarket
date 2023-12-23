import React, { useState } from 'react';

const AddSkinForm = ({ AddSkin }) => {
  const [formData, setFormData] = useState({
    name: '',
    float: '',
    tier: '',
    image: '',
    counts: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    AddSkin(formData);
    setFormData({
      name: '',
      float: '',
      tier: '',
      image: '',
      counts: '',
    });
  };

  return (
    <div className="add-form">
      <h3>Add Skin</h3>
      <form>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />

        <label htmlFor="float">Float:</label>
        <input type="text" id="float" name="float" value={formData.float} onChange={handleChange} required />

        <label htmlFor="tier">Tier:</label>
        <input type="text" id="tier" name="tier" value={formData.tier} onChange={handleChange} required />

        <label htmlFor="image">Image:</label>
        <input type="text" id="image" name="image" value={formData.image} onChange={handleChange} required />

        <label htmlFor="counts">Count:</label>
        <input type="text" id="counts" name="counts" value={formData.counts} onChange={handleChange} required />

        <button type="button" onClick={handleSubmit}>
          Add Skin
        </button>
      </form>
    </div>
  );
};

export default AddSkinForm;
