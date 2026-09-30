import { Router } from 'express';

const router = Router();

router.post('/charge', (req, res) => {
  const { amount, cardNumber } = req.body;

  if (!amount || !cardNumber) {
    return res.status(400).json({
      success: false,
      message: 'amount y cardNumber son requeridos'
    });
  }

  return res.json({
    success: true,
    message: 'Pago procesado correctamente',
    transactionId: `SNAIL-${Date.now()}`,
    amount
  });
});

export default router;