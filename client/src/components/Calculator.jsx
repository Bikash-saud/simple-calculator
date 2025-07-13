import React, { useState, useEffect } from 'react';
import axios from 'axios';
import clickSound from '../assets/click.wav';

function Calculator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]);

  const API = import.meta.env.VITE_API || 'http://localhost:5000';

  const playClick = () => {
    const audio = new Audio(clickSound);
    audio.volume = 0.3;
    audio.play();
  };

  const handleClick = (value) => {
    playClick();
    setInput((prev) => prev + value);
  };

  const clear = () => {
    playClick();
    setInput('');
    setResult('');
  };

  const calculate = async () => {
    playClick();
    if (!input) return;

    try {
      const res = await axios.post(`${API}/api/calculate`, {
        expression: input,
      });
      setResult(res.data.result);
      setInput('');

      // Fetch updated history
      const historyRes = await axios.get(`${API}/api/history`);
      setHistory(historyRes.data);
    } catch (error) {
      setResult('Error');
    }
  };

  // Load history on first render
  useEffect(() => {
    axios.get(`${API}/api/history`)
      .then((res) => setHistory(res.data))
      .catch((err) => console.error('History fetch failed:', err));
  }, []);

  return (
    <div className="calculator-container">
      <div className="calculator">
        <input type="text" value={input} readOnly className="display" />
        <div className="result">= {result}</div>

        <div className="buttons">
          {['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '+'].map((btn) => (
            <button key={btn} onClick={() => handleClick(btn)}>{btn}</button>
          ))}
          <button onClick={calculate} className="equal">=</button>
          <button onClick={clear} className="clear">C</button>
        </div>
      </div>

      <div className="history">
        <h3>History</h3>
        <ul>
          {history.map((entry, index) => (
            <li key={index}>
              {entry.expression} = {entry.result}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Calculator;
