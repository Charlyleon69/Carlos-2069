import { useState } from 'react';

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
} from 'recharts';

interface DashboardProps {
    onLogout: () => void;
}

const data = [
    { name: 'Apuestas ganadas', value: 4 },
    { name: 'Apuestas perdidas', value: 2 },
];

const COLORS = [
    '#00b7ff',
    '#39ff88',
];

const raceData = [
    { name: 'Turbo', victorias: 2, color: '#00b7ff' },
    { name: 'Whiplash', victorias: 1, color: '#504a4a' },
    { name: 'Burn', victorias: 1, color: '#ff1744' },
    { name: 'Skidmark', victorias: 1, color: '#ffd000' },
    { name: 'White Shadow', victorias: 1, color: '#f5f5f5' },
    { name: 'Pepe Maniobra', victorias: 0, color: '#00ff2a' },
];

const corredores = [
    {
        name: 'Turbo',
        image: '/characters/turbo.png',
        color: '#00b7ff',
        description: 'El corredor más rápido del circuito',
        victorias: 2,
    },
    {
        name: 'Whiplash',
        image: '/characters/whiplash.png',
        color: '#504a4a',
        description: 'El rival que nunca baja la velocidad',
        victorias: 1,
    },
    {
        name: 'Burn',
        image: '/characters/burn.png',
        color: '#ff1744',
        description: 'Potencia y velocidad en cada curva',
        victorias: 1,
    },
    {
        name: 'Skidmark',
        image: '/characters/skidmark.png',
        color: '#ffd000',
        description: 'Derrapes que dejan huella',
        victorias: 1,
    },
    {
        name: 'White Shadow',
        image: '/characters/white-shadow.png',
        color: '#f5f5f5',
        description: 'La sombra que aparece en la recta final',
        victorias: 1,
    },
    {
        name: 'Pepe Maniobra',
        image: '/characters/pepe-maniobra.png',
        color: '#00ff2a',
        description: 'Especialista en maniobras inesperadas',
        victorias: 0,
    },
];

interface RaceTooltipProps {
    active?: boolean;
    payload?: any[];
}

function CustomRaceTooltip({
    active,
    payload,
}: RaceTooltipProps) {
    if (!active || !payload || !payload.length) {
        return null;
    }

    const racer = payload[0].payload;

    return (
        <div
            className="race-tooltip"
            style={{
                borderColor: racer.color,
            }}
        >
            <div
                className="race-tooltip-name"
                style={{
                    color: racer.color,
                }}
            >
                {racer.name}
            </div>

            <div className="race-tooltip-value">
                Victorias: {racer.victorias}
            </div>
        </div>
    );
}

function Dashboard({ onLogout }: DashboardProps) {

    const [showPayment, setShowPayment] = useState(false);
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');
    const [fullName, setFullName] = useState('');
    const [amount, setAmount] = useState('');
    const [paymentMessage, setPaymentMessage] = useState('');

    const user = JSON.parse(
        localStorage.getItem('sisuUser') || '{}'
    );

    const userName = user.name || 'Usuario';

    const balance = Number(
        localStorage.getItem('sisuBalance') || '0'
    );

    const handlePayment = async () => {

        setPaymentMessage('');

        if (!/^\d{16}$/.test(cardNumber)) {
            setPaymentMessage(
                'El número de tarjeta debe contener exactamente 16 dígitos.'
            );
            return;
        }

        if (!/^\d{2}\/\d{2}$/.test(expiry)) {
            setPaymentMessage(
                'El vencimiento debe tener el formato MM/AA.'
            );
            return;
        }

        const [month] = expiry.split('/');

        if (
            Number(month) < 1 ||
            Number(month) > 12
        ) {
            setPaymentMessage(
                'El mes de vencimiento debe estar entre 01 y 12.'
            );
            return;
        }

        if (!/^\d{3}$/.test(cvv)) {
            setPaymentMessage(
                'El CVV debe contener exactamente 3 dígitos.'
            );
            return;
        }

        if (!fullName.trim()) {
            setPaymentMessage(
                'El nombre completo es obligatorio.'
            );
            return;
        }

        if (!amount || Number(amount) <= 0) {
            setPaymentMessage(
                'El monto debe ser mayor a $0.'
            );
            return;
        }

        const user = JSON.parse(
            localStorage.getItem('sisuUser') || '{}'
        );

        if (!user.email) {
            setPaymentMessage(
                'No se encontró el correo del usuario registrado.'
            );
            return;
        }

        const controller = new AbortController();

        const timeoutId = setTimeout(() => {
            controller.abort();
        }, 5000);

        try {

            const response = await fetch(
                'http://localhost:3000/api/snailpay/recharge',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    signal: controller.signal,
                    body: JSON.stringify({
                        cardNumber,
                        expiry,
                        cvv,
                        fullName,
                        amount: Number(amount),
                        userId: user.email,
                        userEmail: user.email,
                    }),
                }
            );

            const data = await response.json();

            clearTimeout(timeoutId);

            if (
                !response.ok ||
                data.status !== 'approved'
            ) {
                setPaymentMessage(
                    `Pago rechazado: ${data.status_detail ||
                    'Error en la transacción.'
                    }`
                );
                return;
            }

            const currentBalance = Number(
                localStorage.getItem('sisuBalance') || '0'
            );

            const newBalance =
                currentBalance + Number(amount);

            localStorage.setItem(
                'sisuBalance',
                newBalance.toString()
            );

            localStorage.setItem(
                'sisuCardNumber',
                cardNumber
            );

            localStorage.setItem(
                'sisuCvv',
                cvv
            );

            setPaymentMessage(
                `Pago aprobado. Autorización: ${data.authorization_code
                }. Saldo actualizado a $${newBalance.toFixed(2)}.`
            );

            setAmount('');
            setCardNumber('');
            setExpiry('');
            setCvv('');
            setFullName('');

        } catch (error) {

            if (
                error instanceof DOMException &&
                error.name === 'AbortError'
            ) {
                setPaymentMessage(
                    'La operación excedió el tiempo de espera de SnailPay.'
                );
                return;
            }

            setPaymentMessage(
                'No se pudo conectar con SnailPay. Verifica que el backend esté funcionando.'
            );
        }
    };

    const handleOpenPayment = () => {
        setPaymentMessage('');
        setShowPayment(true);
    };

    const handleClosePayment = () => {
        setPaymentMessage('');
        setShowPayment(false);
    };

    return (

        <div className="dashboard">

            {/* HEADER */}

            <header className="dashboard-header">

                <div className="dashboard-brand">

                    <div className="dashboard-logo">
                        C
                    </div>

                    <div>

                        <h1>
                            CARACOL TURBO
                        </h1>

                        <span>
                            SISTEMA DE CARRERAS
                        </span>

                    </div>

                </div>

                <button
                    className="dashboard-logout"
                    onClick={onLogout}
                >
                    CERRAR SESIÓN
                </button>

            </header>


            <main className="dashboard-content">

                {/* WELCOME */}

                <div className="dashboard-welcome">

                    <span className="section-kicker">
                        RACE CONTROL
                    </span>

                    <h2>
                        Bienvenido, {userName}
                    </h2>

                    <p>
                        Controla tu saldo, revisa las carreras
                        y conoce a los corredores del circuito.
                    </p>

                </div>


                {/* STATS */}

                <div className="stats-grid">

                    <div className="stat-card stat-balance">

                        <span className="stat-label">
                            SALDO ACTUAL
                        </span>

                        <span className="stat-value">
                            ${balance.toFixed(2)}
                        </span>

                    </div>


                    <div className="stat-card stat-races">

                        <span className="stat-label">
                            CARRERAS REGISTRADAS
                        </span>

                        <span className="stat-value">
                            6
                        </span>

                    </div>


                    <div className="stat-card stat-racers">

                        <span className="stat-label">
                            CORREDORES
                        </span>

                        <span className="stat-value">
                            6
                        </span>

                    </div>

                </div>


                {/* SNAILPAY */}

                <section className="payment-section dashboard-card">

                    <div className="card-header payment-header">

                        <div>

                            <span className="card-kicker">
                                SNAILPAY
                            </span>

                            <h2>
                                Agregar saldo
                            </h2>

                            <p>
                                Carga saldo a tu cuenta para participar
                                en las carreras.
                            </p>

                        </div>


                        {!showPayment && (

                            <button
                                className="payment-toggle-button"
                                onClick={handleOpenPayment}
                            >
                                CARGAR SALDO
                            </button>

                        )}

                    </div>


                    {showPayment && (

                        <div className="payment-form">

                            <div className="payment-fields">

                                <div className="form-field">

                                    <label>
                                        NÚMERO DE TARJETA
                                    </label>

                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={16}
                                        value={cardNumber}
                                        onChange={(e) => {

                                            const value =
                                                e.target.value.replace(
                                                    /\D/g,
                                                    ''
                                                );

                                            setCardNumber(value);

                                        }}
                                    />

                                </div>


                                <div className="form-field">

                                    <label>
                                        VENCIMIENTO
                                    </label>

                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={5}
                                        placeholder="MM/AA"
                                        value={expiry}
                                        onChange={(e) => {

                                            let value =
                                                e.target.value
                                                    .replace(
                                                        /\D/g,
                                                        ''
                                                    )
                                                    .slice(0, 4);

                                            if (
                                                value.length > 2
                                            ) {
                                                value =
                                                    `${value.slice(
                                                        0,
                                                        2
                                                    )}/${value.slice(
                                                        2
                                                    )}`;
                                            }

                                            setExpiry(value);

                                        }}
                                    />

                                </div>


                                <div className="form-field">

                                    <label>
                                        CVV
                                    </label>

                                    <input
                                        type="password"
                                        inputMode="numeric"
                                        maxLength={3}
                                        value={cvv}
                                        onChange={(e) => {

                                            const value =
                                                e.target.value.replace(
                                                    /\D/g,
                                                    ''
                                                );

                                            setCvv(value);

                                        }}
                                    />

                                </div>


                                <div className="form-field">

                                    <label>
                                        NOMBRE COMPLETO
                                    </label>

                                    <input
                                        type="text"
                                        maxLength={50}
                                        value={fullName}
                                        onChange={(e) => {

                                            const value =
                                                e.target.value.replace(
                                                    /[^a-zA-ZÁÉÍÓÚáéíóúÑñÜü\s]/g,
                                                    ''
                                                );

                                            setFullName(value);

                                        }}
                                    />

                                </div>


                                <div className="form-field">

                                    <label>
                                        MONTO A CARGAR ($)
                                    </label>

                                    <input
                                        type="text"
                                        inputMode="decimal"
                                        value={amount}
                                        onChange={(e) => {

                                            let value =
                                                e.target.value.replace(
                                                    /[^0-9.]/g,
                                                    ''
                                                );

                                            const parts =
                                                value.split('.');

                                            if (
                                                parts.length > 2
                                            ) {
                                                value =
                                                    `${parts[0]}.${parts[1]}`;
                                            }

                                            setAmount(value);

                                        }}
                                    />

                                </div>

                            </div>


                            {paymentMessage && (

                                <div
                                    className={`payment-message ${paymentMessage.startsWith(
                                        'Pago aprobado'
                                    )
                                        ? 'success'
                                        : 'error'
                                        }`}
                                >
                                    {paymentMessage}
                                </div>

                            )}


                            <div className="payment-actions">

                                <button
                                    className="payment-button"
                                    onClick={handlePayment}
                                >
                                    CARGAR SALDO
                                </button>

                                <button
                                    className="payment-cancel-button"
                                    onClick={handleClosePayment}
                                >
                                    CANCELAR
                                </button>

                            </div>

                        </div>

                    )}

                </section>


                {/* CHARTS */}

                <div className="dashboard-grid">


                    {/* PIE CHART */}

                    <section className="dashboard-card chart-card">

                        <div className="card-header">

                            <div>

                                <span className="card-kicker">
                                    ESTADÍSTICAS
                                </span>

                                <h2>
                                    Apuestas
                                </h2>

                            </div>

                        </div>


                        <div className="chart-container pie-chart-container">

                            <ResponsiveContainer
                                width="100%"
                                height={320}
                            >

                                <PieChart>

                                    {/* EFECTO NEON */}

                                    <defs>

                                        <filter
                                            id="neonBlue"
                                            x="-50%"
                                            y="-50%"
                                            width="200%"
                                            height="200%"
                                        >

                                            <feGaussianBlur
                                                stdDeviation="5"
                                                result="blur"
                                            />

                                            <feMerge>

                                                <feMergeNode in="blur" />

                                                <feMergeNode in="SourceGraphic" />

                                            </feMerge>

                                        </filter>


                                        <filter
                                            id="neonGreen"
                                            x="-50%"
                                            y="-50%"
                                            width="200%"
                                            height="200%"
                                        >

                                            <feGaussianBlur
                                                stdDeviation="5"
                                                result="blur"
                                            />

                                            <feMerge>

                                                <feMergeNode in="blur" />

                                                <feMergeNode in="SourceGraphic" />

                                            </feMerge>

                                        </filter>

                                    </defs>


                                    <Pie
                                        data={data}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={105}
                                        dataKey="value"
                                        label={{
                                            fill: '#ffffff',
                                            fontSize: 10,
                                            fontWeight: 800,
                                        }}
                                    >

                                        {data.map(
                                            (_, index) => (

                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={
                                                        COLORS[
                                                        index %
                                                        COLORS.length
                                                        ]
                                                    }
                                                    stroke={
                                                        COLORS[
                                                        index %
                                                        COLORS.length
                                                        ]
                                                    }
                                                    strokeWidth={4}
                                                    filter={
                                                        index === 0
                                                            ? 'url(#neonBlue)'
                                                            : 'url(#neonGreen)'
                                                    }
                                                />

                                            )
                                        )}

                                    </Pie>


                                    <Tooltip />

                                    <Legend />

                                </PieChart>

                            </ResponsiveContainer>

                        </div>

                    </section>


                    {/* BAR CHART */}

                    <section className="dashboard-card chart-card">

                        <div className="card-header">

                            <div>

                                <span className="card-kicker">
                                    RANKING
                                </span>

                                <h2>
                                    Victorias por caracol
                                </h2>

                            </div>

                        </div>


                        <div className="chart-container bar-chart-container">

                            <ResponsiveContainer
                                width="100%"
                                height={320}
                            >

                                <BarChart
                                    data={raceData}
                                    margin={{
                                        top: 10,
                                        right: 20,
                                        left: 0,
                                        bottom: 10,
                                    }}
                                >

                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                    />

                                    <XAxis
                                        dataKey="name"
                                        tick={{
                                            fill: '#ffffff',
                                            fontSize: 9,
                                        }}
                                    />

                                    <YAxis
                                        allowDecimals={false}
                                        tick={{
                                            fill: '#ffffff',
                                            fontSize: 9,
                                        }}
                                    />

                                    <Tooltip
                                        content={
                                            <CustomRaceTooltip />
                                        }
                                    />

                                    <Legend />

                                    <Bar
                                        dataKey="victorias"
                                        name="Victorias"
                                    >

                                        {raceData.map(
                                            (racer) => (

                                                <Cell
                                                    key={
                                                        racer.name
                                                    }
                                                    fill={
                                                        racer.color
                                                    }
                                                />

                                            )
                                        )}

                                    </Bar>

                                </BarChart>

                            </ResponsiveContainer>

                        </div>

                    </section>

                </div>


                {/* RACERS */}

                <section className="racers-section dashboard-card">

                    <div className="card-header">

                        <div>

                            <span className="card-kicker">
                                GRID DE CARRERA
                            </span>

                            <h2>
                                Corredores
                            </h2>

                        </div>

                    </div>


                    <div className="snail-grid">

                        {corredores.map(
                            (corredor) => (

                                <div
                                    className="snail-card"
                                    key={corredor.name}
                                    style={{
                                        '--racer-color':
                                            corredor.color,
                                    } as React.CSSProperties}
                                >

                                    <div className="snail-avatar">

                                        <img
                                            src={
                                                corredor.image
                                            }
                                            alt={
                                                corredor.name
                                            }
                                            onError={(e) => {

                                                e.currentTarget.style.display =
                                                    'none';

                                                const fallback =
                                                    e.currentTarget
                                                        .nextElementSibling as HTMLElement;

                                                if (fallback) {
                                                    fallback.style.display =
                                                        'block';
                                                }

                                            }}
                                        />

                                        <span className="snail-fallback">
                                            🐌
                                        </span>

                                    </div>


                                    <div className="snail-info">

                                        <h3 className="snail-name">
                                            {corredor.name}
                                        </h3>

                                        <p>
                                            {
                                                corredor.description
                                            }
                                        </p>

                                        <div className="snail-wins">

                                            <span>
                                                VICTORIAS
                                            </span>

                                            <strong>
                                                {
                                                    corredor.victorias
                                                }
                                            </strong>

                                        </div>

                                    </div>

                                </div>

                            )
                        )}

                    </div>

                </section>

            </main>

        </div>

    );
}

export default Dashboard;