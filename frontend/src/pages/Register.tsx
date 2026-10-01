import { useState } from 'react';

interface User {
    name: string;
    email: string;
    password: string;
}

interface RegisterProps {
    onLogin: () => void;
}

function Register({ onLogin }: RegisterProps) {
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

        localStorage.setItem(
            'sisuUser',
            JSON.stringify(user)
        );

        localStorage.setItem(
            'sisuBalance',
            '0'
        );

        setMessage(
            'Usuario registrado correctamente'
        );

        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
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
                            Crear cuenta
                        </h1>

                        <p>
                            Regístrate y entra al circuito
                            de Caracol Turbo.
                        </p>

                    </div>

                    <form
                        className="auth-form"
                        onSubmit={handleRegister}
                    >

                        <div className="form-field">

                            <label>
                                NOMBRE DEL CORREDOR
                            </label>

                            <div className="input-wrapper">

                                <span className="input-icon">
                                    ◆
                                </span>

                                <input
                                    type="text"
                                    placeholder="Ingresa tu nombre"
                                    value={name}
                                    onChange={(e) =>
                                        setName(
                                            e.target.value
                                        )
                                    }
                                />

                            </div>

                        </div>

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
                                    placeholder="Crea una contraseña"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(
                                            e.target.value
                                        )
                                    }
                                />

                            </div>

                        </div>

                        <div className="form-field">

                            <label>
                                CONFIRMAR CONTRASEÑA
                            </label>

                            <div className="input-wrapper">

                                <span className="input-icon">
                                    ●
                                </span>

                                <input
                                    type="password"
                                    placeholder="Repite tu contraseña"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(
                                            e.target.value
                                        )
                                    }
                                />

                            </div>

                        </div>

                        {message && (
                            <div
                                className={`auth-message ${message ===
                                        'Usuario registrado correctamente'
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
                            CREAR CUENTA
                        </button>

                        <button
                            type="button"
                            className="auth-secondary-button"
                            onClick={onLogin}
                        >
                            INICIAR SESIÓN
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

export default Register;
