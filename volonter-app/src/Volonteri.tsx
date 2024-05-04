import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Volonteri.css';

interface Volonter {
  id: number;
  ime: string;
  prezime: string;
  slika: string;
}

const Volonteri: React.FC = () => {
  const [volonteri, setVolonteri] = useState<Volonter[]>([]);

  useEffect(() => {
    axios.get<Volonter[]>('http://localhost:3000/volonteri')
      .then(response => {
        setVolonteri(response.data);
      })
      .catch(error => {
        console.error('Greška pri dohvaćanju podataka o volonterima:', error);
      });
  }, []);

  return (
    <div className="volonteri">
      <h2>Volonteri</h2>
      <ul>
        {volonteri.map(volonter => (
          <li key={volonter.id}>
            <img src={volonter.slika} alt={`${volonter.ime} ${volonter.prezime}`} />
            <span>{volonter.ime} {volonter.prezime}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Volonteri;
