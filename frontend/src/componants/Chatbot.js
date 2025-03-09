import React, { useState } from 'react';

const Chatbot = () => {
  const [userInput, setUserInput] = useState('');
  const [botResponse, setBotResponse] = useState('');

  const handleSubmit = () => {
    // Simple logic for responding to user input
    if (userInput.toLowerCase().includes('player stats')) {
      setBotResponse("Here's the player's stats...");
    } else {
      setBotResponse("I don't have enough knowledge to answer that question.");
    }
    setUserInput('');
  };

  return (
    <div>
      <h3>Spiriter Chatbot</h3>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Ask me something!"
      />
      <button onClick={handleSubmit}>Ask</button>
      <div>{botResponse}</div>
    </div>
  );
};

export default Chatbot;
