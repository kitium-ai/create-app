import { useState } from 'react';
import { useToggle } from '@kitiumai/utils-react';

function App() {
  const [count, setCount] = useState(0);
  const [showMessage, toggleMessage] = useToggle(false);

  return (
    <div className="app">
      <header>
        <h1>Welcome to {{PROJECT_NAME}}</h1>
        <p>React + TypeScript + Vite</p>
      </header>

      <main>
        <div className="counter">
          <h2>Counter: {count}</h2>
          <button onClick={() => setCount((c) => c + 1)}>
            Increment
          </button>
        </div>

        <div className="toggle">
          <button onClick={toggleMessage}>
            {showMessage ? 'Hide' : 'Show'} Message
          </button>
          {showMessage && (
            <p>Powered by KitiumAI utilities!</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
