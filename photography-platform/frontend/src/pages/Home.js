import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
  const [photographers, setPhotographers] = useState([]);

  useEffect(() => {
    const fetchPhotographers = async () => {
      const { data } = await axios.get('/api/photographers/search');
      setPhotographers(data);
    };
    fetchPhotographers();
  }, []);

  return (
    <div>
      <h1>Photographers</h1>
      <ul>
        {photographers.map((photographer) => (
          <li key={photographer._id}>{photographer.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
