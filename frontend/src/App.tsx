import { useState } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './components/Dashboard';

function App() {
  const [view, setView] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('sisuLoggedIn') === 'true'
  );

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('sisuLoggedIn');
    setIsLoggedIn(false);
    setView('login');
  };

  if (isLoggedIn) {
    return (
      <Dashboard onLogout={handleLogout} />
    );
  }

  return (
    <div>
      <h1>SISU</h1>

      <div>
        <button onClick={() => setView('login')}>
          Iniciar sesión
        </button>

        <button onClick={() => setView('register')}>
          Crear cuenta
        </button>
      </div>

      <hr />

      {view === 'login' && <Login onLogin={handleLogin} />}

      {view === 'register' && <Register />}
    </div>
  );
}

export default App;