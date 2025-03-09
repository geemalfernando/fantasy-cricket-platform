import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboardPage = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Form state for adding new players
  const [newPlayer, setNewPlayer] = useState({
    name: '',
    team: '',
    price: 0,
    role: 'Batsman'
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    axios.get('http://localhost:5000/api/admin/players', {
      headers: {
        Authorization:  `Bearer ${token}`
      }
    })
    .then(response => {
      setPlayers(response.data);
      setLoading(false);
    })
    .catch(err => {
      setError('Failed to load players. ' + (err.response?.data?.message || ''));
      setLoading(false);
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPlayer({
      ...newPlayer,
      [name]: name === 'price' ? parseInt(value) || 0 : value
    });
  };

  const handleAddPlayer = async (e) => {
    e.preventDefault();
    
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(
          'http://localhost:5000/api/admin/players',
          newPlayer,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Corrected syntax for template literal
            },
          }
        );
        
      
      // Add new player to the list
      setPlayers([...players, response.data]);
      
      // Reset form
      setNewPlayer({
        name: '',
        team: '',
        price: 0,
        role: 'Batsman'
      });
    } catch (err) {
      setError('Failed to add player. ' + (err.response?.data?.message || ''));
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="admin-section">
        <h2>Add New Player</h2>
        <form onSubmit={handleAddPlayer}>
          <div className="form-group">
            <label htmlFor="name">Player Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={newPlayer.name}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="team">Team</label>
            <input
              type="text"
              id="team"
              name="team"
              value={newPlayer.team}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={newPlayer.price}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={newPlayer.role}
              onChange={handleInputChange}
              required
            >
              <option value="Batsman">Batsman</option>
              <option value="Bowler">Bowler</option>
              <option value="All-Rounder">All-Rounder</option>
              <option value="Wicket-Keeper">Wicket-Keeper</option>
            </select>
          </div>
          
          <button type="submit">Add Player</button>
        </form>
      </div>
      
      <div className="admin-section">
        <h2>Manage Players</h2>
        
        {loading ? (
          <p>Loading players...</p>
        ) : (
          <table className="players-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Team</th>
                <th>Price</th>
                <th>Role</th>
                <th>Points</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {players.map(player => (
                <tr key={player.id}>
                  <td>{player.id}</td>
                  <td>{player.name}</td>
                  <td>{player.team}</td>
                  <td>{player.price}</td> {/* Using $ in template literals for price */}
                  <td>{player.role}</td>
                  <td>{player.points || 0}</td>
                  <td>
                    <button className="btn-edit">Edit</button>
                    <button className="btn-delete">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardPage;