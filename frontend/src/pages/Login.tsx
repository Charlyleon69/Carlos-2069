import { useState } from 'react';

interface LoginProps {
    onLogin: () => void;
    onRegister: () => void;
}

function Login({ onLogin, onRegister }: LoginProps) {
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

        if (
            user.email === email &&
            user.password === password
        ) {
            localStorage.setItem(
                'sisuLoggedIn',
                'true'
            );

            setMessage(
                `Bienvenido, ${user.name}`
            );

            onLogin();

            return;
        }

        setMessage(
            'Correo o contraseña incorrectos'
        );
    };

    return (
        <div className="auth-page">

            <div className="auth-decoration auth-decoration-one" />
            <div className="auth-decoration auth-decoration-two" />

            <div className="auth-container">

                <div className="auth-brand-panel">

                    <div className="auth-logo">
                        C
                    </div>

                    <h1 className="auth-brand-name">
                        CARACOL
                        <br />
                        <span>TURBO</span>
                    </h1>

                    <div className="auth-brand-subtitle">
                        SISTEMA DE CARRERAS
                    </div>

                    <div className="auth-racing-line" />

                    <div className="auth-snail">
                        🐌
                    </div>

                    <p className="auth-racing-text">
                        VELOCIDAD · ESTRATEGIA · CIRCUITO
                    </p>

                </div>

                <div className="auth-form-panel">

                    <div className="auth-form-header">

                        <span className="section-kicker">
                            RACE CONTROL
                        </span>

                        <h1>
                            Iniciar sesión
                        </h1>

                        <p>
                            Ingresa a tu centro de control
                            y prepárate para la próxima carrera.
                        </p>

                    </div>

                    <form
                        className="auth-form"
                        onSubmit={handleLogin}
                    >

                        <div className="form-field">

                            <label>
                                CORREO ELECTRÓNICO
                            </label>

                            <div className="input-wrapper">

                                <span className="input-icon">
                                    @
                                </span>

                                <input
                                    type="email"
                                    placeholder="correo@ejemplo.com"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(
                                            e.target.value
                                        )
                                    }
                                />

                            </div>

                        </div>

                        <div className="form-field">

                            <label>
                                CONTRASEÑA
                            </label>

                            <div className="input-wrapper">

                                <span className="input-icon">
                                    ●
                                </span>

                                <input
                                    type="password"
                                    placeholder="Ingresa tu contraseña"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(
                                            e.target.value
                                        )
                                    }
                                />

                            </div>

                        </div>

                        {message && (
                            <div
                                className={`auth-message ${message.startsWith(
                                    'Bienvenido'
                                )
                                        ? 'success'
                                        : 'error'
                                    }`}
                            >
                                {message}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="auth-primary-button"
                        >
                            INICIAR SESIÓN
                        </button>

                        <button
                            type="button"
                            className="auth-secondary-button"
                            onClick={onRegister}
                        >
                            CREAR CUENTA
                        </button>

                    </form>

                    <div className="auth-footer">

                        <span>
                            CARACOL TURBO
                        </span>

                        <span className="auth-footer-dot">
                            {' • '}
                        </span>

                        <span>
                            Sistema de Carreras
                        </span>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;