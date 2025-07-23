import { Schema, model, Document } from 'mongoose';

export interface IPayment extends Document {
  amount?: number;
  status?: string;
  razorPay_payment_id?: string;
  price_id?: string;
  user_email: string;
  created_at: Date;
  updated_at: Date;
}

const paymentSchema = new Schema<IPayment>({
  amount: { type: Number },
  status: { type: String },
  razorPay_payment_id: { type: String },
  price_id: { type: String },
  user_email: { type: String, required: true }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

export const Payment = model<IPayment>('Payment', paymentSchema);
