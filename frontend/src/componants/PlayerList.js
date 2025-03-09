import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PlayerList = ({ onSelectPlayer }) => {
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get('/api/players');
        setPlayers(response.data);
      } catch (err) {
        setError('Failed to load players');
      }
    };
    
    fetchPlayers();
  }, []);

  return (
    <div>
      <h3>Available Players</h3>
      {error && <p>{error}</p>}
      <div className="player-list">
        {players.map(player => (
          <div key={player._id} className="player-card" onClick={() => onSelectPlayer(player)}>
            <h4>{player.name}</h4>
            <p>Category: {player.category}</p>
            <p>Price: {player.price}</p>
            <p>Points: {player.points}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerList;
