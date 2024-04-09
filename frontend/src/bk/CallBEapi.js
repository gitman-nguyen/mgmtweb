import React, { useState } from 'react';
import axios from 'axios';

const CommandRunner = () => {
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState('');

  const runCommand = async () => {
    try {
      const response = await axios.post('http://192.168.1.12:5000/api/run-command', { command });
      setOutput(response.data.output);
    } catch (error) {
      console.error('Error running command:', error);
    }
  };

  return (
    <div>
      <input type="text" value={command} onChange={(e) => setCommand(e.target.value)} />
      <button onClick={runCommand}>Run Command</button>
      <div>
        <pre>{output}</pre>
      </div>
    </div>
  );
};

export default CommandRunner;
