import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [players, setPlayers] = useState([]);
  const [newPlayer, setNewPlayer] = useState({
    name: '',
    category: '',
    points: 0,
    price: 0,
    stats: { runs: 0, wickets: 0, matches: 0 }
  });

  useEffect(() => {
    axios.get('/api/admin/players')
      .then(response => {
        setPlayers(response.data);
      })
      .catch(err => console.error(err));
  }, []);

  const handlePlayerSubmit = () => {
    axios.post('/api/admin/player', newPlayer)
      .then(response => {
        setPlayers([...players, response.data]);
        setNewPlayer({ name: '', category: '', points: 0, price: 0, stats: { runs: 0, wickets: 0, matches: 0 } });
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <div>
        <h3>Add or Update Player</h3>
        <input 
          type="text" 
          value={newPlayer.name} 
          onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
          placeholder="Player Name"
        />
        {/* Add other fields similarly */}
        <button onClick={handlePlayerSubmit}>Submit</button>
      </div>
      <h3>Players</h3>
      <ul>
        {players.map((player) => (
          <li key={player._id}>
            {player.name} - {player.category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
