import express from 'express';
import cors from 'cors';
import { randomUUID } from 'crypto';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

interface SnailPayRequest {
    cardNumber: string;
    expiry: string;
    cvv: string;
    fullName: string;
    amount: number;
    userId: string;
    userEmail: string;
}

app.get('/api/health', (_req, res) => {
    res.json({
        status: 'ok',
        message: 'SISU backend funcionando correctamente',
    });
});

app.post('/api/snailpay/recharge', async (req, res) => {
    try {
        const {
            cardNumber,
            expiry,
            cvv,
            fullName,
            amount,
            userId,
            userEmail,
        } = req.body as SnailPayRequest;

        if (
            !cardNumber ||
            !expiry ||
            !cvv ||
            !fullName ||
            !amount ||
            !userId ||
            !userEmail
        ) {
            return res.status(400).json({
                id: randomUUID(),
                status: 'rejected',
                status_detail: 'missing_required_data',
                transaction_amount: Number(amount) || 0,
                date_created: new Date().toISOString(),
                reference: `SISU-${Date.now()}`,
                payer_id: userId || '',
                payer_email: userEmail || '',
                cardNumber: cardNumber || '',
                cvv: cvv || '',
            });
        }

        if (cardNumber === '8888888888888888') {
            await new Promise((resolve) => setTimeout(resolve, 10000));
        }
        if (cardNumber === '9999999999999999') {
            return res.status(500).json({
                id: randomUUID(),
                status: 'error',
                status_detail: 'internal_error',
                transaction_amount: Number(amount),
                date_created: new Date().toISOString(),
                reference: `SISU-${Date.now()}`,
                payer_id: userId,
                payer_email: userEmail,
                cardNumber,
                cvv,
            });
        }

        const isApproved =
            cardNumber === '1234123412341234' &&
            expiry === '12/26' &&
            cvv === '543' &&
            fullName.trim().length > 0 &&
            Number(amount) > 0;

        if (!isApproved) {
            return res.status(402).json({
                id: randomUUID(),
                status: 'rejected',
                status_detail: 'invalid_test_data',
                transaction_amount: Number(amount),
                date_created: new Date().toISOString(),
                reference: `SISU-${Date.now()}`,
                payer_id: userId,
                payer_email: userEmail,
                cardNumber,
                cvv,
            });
        }

        return res.status(200).json({
            id: randomUUID(),
            status: 'approved',
            status_detail: 'accredited',
            transaction_amount: Number(amount),
            date_created: new Date().toISOString(),
            authorization_code: `AUTH-${Date.now()}`,
            reference: `SISU-${Date.now()}`,
            payer_id: userId,
            payer_email: userEmail,
            cardNumber,
            cvv,
        });
    } catch {
        return res.status(500).json({
            id: randomUUID(),
            status: 'error',
            status_detail: 'internal_error',
            transaction_amount: 0,
            date_created: new Date().toISOString(),
            reference: `SISU-${Date.now()}`,
            payer_id: '',
            payer_email: '',
            cardNumber: '',
            cvv: '',
        });
    }
});

app.listen(PORT, () => {
    console.log(`SISU backend ejecutándose en http://localhost:${PORT}`);
});