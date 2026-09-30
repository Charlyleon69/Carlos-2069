import { useState } from 'react';

interface LoginProps {
    onLogin: () => void;
}

function Login({ onLogin }: LoginProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        const storedUser = localStorage.getItem('sisuUser');

        if (!storedUser) {
            setMessage('No existe ningún usuario registrado');
            return;
        }

        const user = JSON.parse(storedUser);

        if (user.email === email && user.password === password) {
            localStorage.setItem('sisuLoggedIn', 'true');
            setMessage(`Bienvenido, ${user.name}`);
            onLogin();
            return;
        }

        setMessage('Correo o contraseña incorrectos');
    };

    return (
        <div>
            <h1>Iniciar sesión</h1>

            <form onSubmit={handleLogin}>
                <div>
                    <label>Correo electrónico</label>
                    <br />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <br />

                <div>
                    <label>Contraseña</label>
                    <br />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <br />

                <button type="submit">
                    Iniciar sesión
                </button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
}

export default Login;