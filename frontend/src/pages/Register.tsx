import { useState } from 'react';

interface User {
    name: string;
    email: string;
    password: string;
}

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();

        setMessage('');

        if (!name || !email || !password || !confirmPassword) {
            setMessage('Todos los campos son obligatorios');
            return;
        }

        if (password !== confirmPassword) {
            setMessage('Las contraseñas no coinciden');
            return;
        }

        const user: User = {
            name,
            email,
            password,
        };

        localStorage.setItem('sisuUser', JSON.stringify(user));
        localStorage.setItem('sisuBalance', '0');

        setMessage('Usuario registrado correctamente');

        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    };

    return (
        <div>
            <h1>Crear cuenta</h1>

            <form onSubmit={handleRegister}>
                <div>
                    <label>Nombre</label>
                    <br />
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <br />

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

                <div>
                    <label>Confirmar contraseña</label>
                    <br />
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                <br />

                <button type="submit">
                    Registrarse
                </button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
}

export default Register;