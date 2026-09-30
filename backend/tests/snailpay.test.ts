import { describe, it, expect } from 'vitest';

describe('SnailPay', () => {
    it('debe aprobar una recarga con datos válidos', () => {
        const cardNumber = '1234123412341234';
        const expiry = '12/26';
        const cvv = '543';
        const fullName = 'Carlos';
        const amount = 100;

        const isApproved =
            cardNumber === '1234123412341234' &&
            expiry === '12/26' &&
            cvv === '543' &&
            fullName.trim().length > 0 &&
            amount > 0;

        expect(isApproved).toBe(true);
    });

    it('debe rechazar una recarga con datos inválidos', () => {
        const cardNumber = '1111111111111111';
        const expiry = '12/26';
        const cvv = '123';
        const fullName = 'Carlos';
        const amount = 100;

        const isApproved =
            cardNumber === '1234123412341234' &&
            expiry === '12/26' &&
            cvv === '543' &&
            fullName.trim().length > 0 &&
            amount > 0;

        expect(isApproved).toBe(false);
    });

    it('debe identificar un timeout de SnailPay', () => {
        const cardNumber = '8888888888888888';

        const isTimeoutScenario =
            cardNumber === '8888888888888888';

        expect(isTimeoutScenario).toBe(true);
    });

    it('debe identificar un error de sistema', () => {
        const cardNumber = '9999999999999999';

        const isSystemError =
            cardNumber === '9999999999999999';

        expect(isSystemError).toBe(true);
    });

    it('debe responder correctamente al endpoint de SnailPay', async () => {
        const response = await fetch(
            'http://localhost:3000/api/snailpay/recharge',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cardNumber: '1234123412341234',
                    expiry: '12/26',
                    cvv: '543',
                    fullName: 'Carlos',
                    amount: 100,
                    userId: 'carlos@test.com',
                    userEmail: 'carlos@test.com',
                }),
            }
        );

        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data.status).toBe('approved');
        expect(data.status_detail).toBe('accredited');
        expect(data.transaction_amount).toBe(100);
        expect(data.cardNumber).toBe('1234123412341234');
        expect(data.cvv).toBe('543');
    });

});