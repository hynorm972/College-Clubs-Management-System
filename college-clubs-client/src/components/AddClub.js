import React, { useState } from 'react';

const AddClub = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('')
  const [error,setError] = useState(null)


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
  
  
    try {
      const response = await fetch('/api/clubs', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Failed to add club');
      }
  
      const data = await response.json();
      console.log('Club added:', data);
      // Call the function to refresh the list of clubs
      AddClub();  // Ensure this function re-fetches and updates the list of clubs
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  
      
  return (
    <div>
    <form className="create" onSubmit={handleSubmit} method='POST'>
      <div>
        <label>Name: </label>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </div>
      <div>
        <label>Description: </label>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
      </div>
    </form>
    <form method="POST" action="C:\Users\ACK\Desktop\College-Clubs\backend\uploads" enctype="multipart/form-data"> 
      <input type="file" name="clubImage" />
      <button type="submit">Add Club</button>
    </form>
    </div>
  )
}

export default AddClub;
