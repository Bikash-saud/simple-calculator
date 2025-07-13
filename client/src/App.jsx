// import React from 'react';
// import Calculator from './components/Calculator';

// function App() {
//   return (
//     <div className="app-container">
//       <h1>React Calculator</h1>
//       <Calculator />
//     </div>
//   );
// }

// export default App;


import React, { useState, useEffect } from 'react';
import Calculator from './components/Calculator';

function App() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    document.body.className = dark ? 'dark' : '';
  }, [dark]);

  return (
    <div className="app-container">
      <h1>Simple calculator</h1>
      <button onClick={() => setDark(!dark)}>
        Switch to {dark ? 'Light' : 'Dark'} Mode
      </button>
      <Calculator />
    </div>
  );
}

export default App;


