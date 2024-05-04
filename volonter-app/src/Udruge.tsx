import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Udruge.css'


interface Udruga {
  id: number;
  naziv: string;
  logo: string;
}

const Udruge: React.FC = () => {
  const [udruge, setUdruge] = useState<Udruga[]>([]);

  useEffect(() => {
    axios.get<Udruga[]>('http://localhost:3000/udruge')
      .then(response => {
        setUdruge(response.data);
      })
      .catch(error => {
        console.error('Greška pri dohvaćanju podataka o udrugama:', error);
      });
  }, []);

  return (
    <div className="udruge">
      <h2>Udruge</h2>
      <ul>
        {udruge.map(udruga => (
          <li key={udruga.id}>
            <img src={udruga.logo} alt={udruga.naziv} />
            <span>{udruga.naziv}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Udruge;
