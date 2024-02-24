import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file for styling

const App = () => {
  const [companies, setCompanies] = useState([]);
  const [newCompany, setNewCompany] = useState({ name: '', location: '' });
  const [editingCompany, setEditingCompany] = useState(null);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await axios.get('http://localhost:3000/companies');
      setCompanies(response.data);
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setNewCompany(prevCompany => ({ ...prevCompany, [name]: value }));
  };

  const handleCreateCompany = async () => {
    try {
      await axios.post('http://localhost:3000/company', newCompany);
      setNewCompany({ name: '', location: '' });
      fetchCompanies();
    } catch (error) {
      console.error('Error creating company:', error);
    }
  };

  const handleEditCompany = (id) => {
    setEditingCompany(id);
  };

  const handleInputChangeForCompany = (e, id, fieldName) => {
    const { value } = e.target;
    const updatedCompanies = companies.map(company => {
      if (company.id === id) {
        return { ...company, [fieldName]: value };
      }
      return company;
    });
    setCompanies(updatedCompanies);
  };

  const handleUpdateCompany = async (id, updatedCompany) => {
    try {
      await axios.put(`http://localhost:3000/company/${id}`, updatedCompany);
      fetchCompanies();
      setEditingCompany(null); // Reset editingCompany state after update
    } catch (error) {
      console.error('Error updating company:', error);
    }
  };

  const handleDeleteCompany = async id => {
    try {
      await axios.delete(`http://localhost:3000/company/${id}`);
      fetchCompanies();
    } catch (error) {
      console.error('Error deleting company:', error);
    }
  };

  return (
    <div className='container'>
      <h1 className='header'>Companies</h1>
      <ul className='companies-list'>
        {companies.map(company => (
          <li key={company.id} className='company-item'>
            {editingCompany === company.id ? (
              <>
                <input
                  className='company-input'
                  type="text"
                  value={company.name}
                  onChange={(e) => handleInputChangeForCompany(e, company.id, 'name')}
                />
                <input
                  className='company-input'
                  type="text"
                  value={company.location}
                  onChange={(e) => handleInputChangeForCompany(e, company.id, 'location')}
                />
                <button className='company-button' onClick={() => handleUpdateCompany(company.id, company)}>Save</button>
              </>
            ) : (
              <>
                <span className='company-info'>{company.name} - {company.location}</span>
                <button className='company-button' onClick={() => handleEditCompany(company.id)}>Update</button>
                <button className='company-button' onClick={() => handleDeleteCompany(company.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
      <h2 className='create-company-header'>Create Company</h2>
      <input
        className='company-input'
        type="text"
        name="name"
        placeholder="Company Name"
        value={newCompany.name}
        onChange={handleInputChange}
      />
      <input
        className='company-input'
        type="text"
        name="location"
        placeholder="Location"
        value={newCompany.location}
        onChange={handleInputChange}
      />
      <button className='company-button create-button' onClick={handleCreateCompany}>Create</button>
    </div>
  );
};

export default App;


//https://chat.openai.com/share/b7bea165-01f0-4b6c-9978-0136aa567bfb