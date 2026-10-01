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
      <Dashboard
        onLogout={handleLogout}
      />
    );
  }

  if (view === 'register') {
    return (
      <Register
        onLogin={() =>
          setView('login')
        }
      />
    );
  }

  return (
    <Login
      onLogin={handleLogin}
      onRegister={() =>
        setView('register')
      }
    />
  );
}

export default App;