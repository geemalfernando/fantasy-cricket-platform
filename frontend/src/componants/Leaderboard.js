import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get('/api/leaderboard');
        setLeaderboard(response.data);
      } catch (err) {
        setError('Failed to load leaderboard');
      }
    };
    
    fetchLeaderboard();
  }, []);

  return (
    <div>
      <h3>Leaderboard</h3>
      {error && <p>{error}</p>}
      <div className="leaderboard-list">
        {leaderboard.map((entry, index) => (
          <div key={index} className="leaderboard-entry">
            <p>{index + 1}. {entry.username} - {entry.points} points</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
