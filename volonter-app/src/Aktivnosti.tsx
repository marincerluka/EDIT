import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Aktivnosti.css';

interface Aktivnost {
  id: number;
  naziv: string;
  mjesto: string;
  vrijeme: string;
  organizator: string;
}

const Aktivnosti: React.FC = () => {
  const [aktivnosti, setAktivnosti] = useState<Aktivnost[]>([]);
  const [novaAktivnost, setNovaAktivnost] = useState<Aktivnost>({
    id: 0,
    naziv: "",
    mjesto: "",
    vrijeme: "",
    organizator: ""
  });

  useEffect(() => {
    axios.get<Aktivnost[]>('http://localhost:3000/aktivnosti')
      .then(response => {
        setAktivnosti(response.data);
      })
      .catch(error => {
        console.error('Greška pri dohvaćanju podataka o aktivnostima:', error);
      });
  }, []);

  const dodajAktivnost = () => {
    axios.post<Aktivnost>('http://localhost:3000/aktivnosti', novaAktivnost)
      .then(response => {
        setAktivnosti([...aktivnosti, response.data]);
        setNovaAktivnost({
          id: 0,
          naziv: "",
          mjesto: "",
          vrijeme: "",
          organizator: ""
        });
      })
      .catch(error => {
        console.error('Greška pri dodavanju aktivnosti:', error);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNovaAktivnost(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="aktivnosti">
      <h2>Aktivnosti</h2>
      <div className="aktivnosti-grid">
        {aktivnosti.map(aktivnost => (
          <div className="aktivnost" key={aktivnost.id}>
            <h3>{aktivnost.naziv}</h3>
            <p>Mjesto: {aktivnost.mjesto}</p>
            <p>Vrijeme: {aktivnost.vrijeme}</p>
            <p>Organizator: {aktivnost.organizator}</p>
          </div>
        ))}
      </div>
      <div className="nova-aktivnost">
        <h2>Dodaj novu aktivnost</h2>
        <input type="text" name="naziv" value={novaAktivnost.naziv} onChange={handleChange} placeholder="Naziv" />
        <input type="text" name="mjesto" value={novaAktivnost.mjesto} onChange={handleChange} placeholder="Mjesto" />
        <input type="text" name="vrijeme" value={novaAktivnost.vrijeme} onChange={handleChange} placeholder="Vrijeme" />
        <input type="text" name="organizator" value={novaAktivnost.organizator} onChange={handleChange} placeholder="Organizator" />
        <button onClick={dodajAktivnost}>Dodaj aktivnost</button>
      </div>
    </div>
  );
};

export default Aktivnosti;
