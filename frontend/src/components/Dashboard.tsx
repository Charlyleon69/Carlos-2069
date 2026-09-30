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
} from 'recharts';

interface DashboardProps {
    onLogout: () => void;
}

const data = [
    { name: 'Apuestas ganadas', value: 4 },
    { name: 'Apuestas perdidas', value: 2 },
];

const COLORS = [
    '#0088FE',
    '#00C49F',
    '#FFBB28',
    '#FF8042',
    '#8884d8',
    '#82ca9d',
];

const raceData = [
    { name: 'Turbo', victorias: 2 },
    { name: 'Chet', victorias: 1 },
    { name: 'Burn', victorias: 1 },
    { name: 'Whiplash', victorias: 1 },
    { name: 'Skid Mark', victorias: 1 },
    { name: 'White Shadow', victorias: 0 },
];

function Dashboard({ onLogout }: DashboardProps) {
    const [showPayment, setShowPayment] = useState(false);
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');
    const [fullName, setFullName] = useState('');
    const [amount, setAmount] = useState('');
    const [paymentMessage, setPaymentMessage] = useState('');

    const user = JSON.parse(localStorage.getItem('sisuUser') || '{}');
    const userName = user.name || 'Usuario';
    const balance = Number(localStorage.getItem('sisuBalance') || '0');

    const handlePayment = async () => {
        setPaymentMessage('');

        if (!/^\d{16}$/.test(cardNumber)) {
            setPaymentMessage(
                'El número de tarjeta debe contener exactamente 16 dígitos.'
            );
            return;
        }

        if (!/^\d{2}\/\d{2}$/.test(expiry)) {
            setPaymentMessage('El vencimiento debe tener el formato MM/AA.');
            return;
        }

        const [month] = expiry.split('/');

        if (Number(month) < 1 || Number(month) > 12) {
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
            setPaymentMessage('El nombre completo es obligatorio.');
            return;
        }

        if (!amount || Number(amount) <= 0) {
            setPaymentMessage('El monto debe ser mayor a $0.');
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

            if (!response.ok || data.status !== 'approved') {
                setPaymentMessage(
                    `Pago rechazado: ${data.status_detail || 'Error en la transacción.'}`
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

            localStorage.setItem('sisuCardNumber', cardNumber);
            localStorage.setItem('sisuCvv', cvv);

            setPaymentMessage(
                `Pago aprobado. Autorización: ${data.authorization_code}. Saldo actualizado a $${newBalance.toFixed(2)}.`
            );

            setAmount('');
            setCardNumber('');
            setExpiry('');
            setCvv('');
            setFullName('');
        } catch (error) {
            if (error instanceof DOMException && error.name === 'AbortError') {
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

    return (
        <div>
            <h1>Dashboard</h1>

            <p>Bienvenido, {userName}.</p>

            <p>Saldo actual: ${balance.toFixed(2)}</p>

            <button onClick={() => setShowPayment(true)}>
                Cargar saldo
            </button>

            {showPayment && (
                <div>
                    <h2>SnailPay</h2>

                    <div>
                        <label>Número de tarjeta</label>
                        <br />
                        <input
                            type="text"
                            inputMode="numeric"
                            maxLength={16}
                            value={cardNumber}
                            onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, '');
                                setCardNumber(value);
                            }}
                        />
                    </div>

                    <br />

                    <div>
                        <label>Vencimiento</label>
                        <br />
                        <input
                            type="text"
                            inputMode="numeric"
                            maxLength={5}
                            placeholder="MM/AA"
                            value={expiry}
                            onChange={(e) => {
                                let value = e.target.value
                                    .replace(/\D/g, '')
                                    .slice(0, 4);

                                if (value.length > 2) {
                                    value = `${value.slice(0, 2)}/${value.slice(2)}`;
                                }

                                setExpiry(value);
                            }}
                        />
                    </div>

                    <br />

                    <div>
                        <label>CVV</label>
                        <br />
                        <input
                            type="text"
                            inputMode="numeric"
                            maxLength={3}
                            value={cvv}
                            onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, '');
                                setCvv(value);
                            }}
                        />
                    </div>

                    <br />

                    <div>
                        <label>Nombre completo</label>
                        <br />
                        <input
                            type="text"
                            maxLength={50}
                            value={fullName}
                            onChange={(e) => {
                                const value = e.target.value.replace(
                                    /[^a-zA-ZÁÉÍÓÚáéíóúÑñÜü\s]/g,
                                    '',
                                );
                                setFullName(value);
                            }}
                        />
                    </div>

                    <br />

                    <div>
                        <label>Monto a cargar ($)</label>
                        <br />
                        <input
                            type="text"
                            inputMode="decimal"
                            value={amount}
                            onChange={(e) => {
                                let value = e.target.value.replace(/[^0-9.]/g, '');

                                const parts = value.split('.');

                                if (parts.length > 2) {
                                    value = `${parts[0]}.${parts[1]}`;
                                }

                                setAmount(value);
                            }}
                        />
                    </div>

                    <br />

                    <button onClick={handlePayment}>
                        Cargar saldo
                    </button>

                    {paymentMessage && <p>{paymentMessage}</p>}

                    <button onClick={() => setShowPayment(false)}>
                        Cancelar
                    </button>
                </div>
            )}

            <h2>Apuestas</h2>

            <PieChart width={500} height={350}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    dataKey="value"
                    label
                >
                    {data.map((_, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                        />
                    ))}
                </Pie>

                <Tooltip />
                <Legend />
            </PieChart>

            <h2>Victorias por caracol</h2>

            <BarChart width={600} height={350} data={raceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="victorias" name="Victorias" />
            </BarChart>

            <button onClick={onLogout}>
                Cerrar sesión
            </button>
        </div>
    );
}

export default Dashboard;