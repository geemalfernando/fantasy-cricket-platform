import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlayerList from './PlayerList';

const TeamSelection = ({ user, onSaveTeam }) => {
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [budget, setBudget] = useState(9000000); // Initial budget
  const [error, setError] = useState(null);

  const handlePlayerSelect = (player) => {
    if (selectedPlayers.length < 11 && budget >= player.price) {
      setSelectedPlayers([...selectedPlayers, player]);
      setBudget(budget - player.price);
    } else {
      setError('You cannot select more than 11 players or exceed your budget.');
    }
  };

  const handleSaveTeam = () => {
    if (selectedPlayers.length === 11) {
      onSaveTeam(selectedPlayers);
    } else {
      setError('Please select 11 players.');
    }
  };

  return (
    <div>
      <h3>Select Your Team</h3>
      {error && <p>{error}</p>}
      <PlayerList onSelectPlayer={handlePlayerSelect} />
      <h4>Budget Left: Rs. {budget}</h4>
      <h4>Selected Players: {selectedPlayers.length}/11</h4>
      <button onClick={handleSaveTeam}>Save Team</button>
    </div>
  );
};

export default TeamSelection;
