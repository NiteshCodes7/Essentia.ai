import { Schema, model, Document, models } from 'mongoose';

export interface IPayment extends Document {
  id?: string,
  amount?: number;
  status?: string;
  razorPay_payment_id?: string;
  price_id?: string;
  user_email: string;
  captured_at?: Date,
  failed_at?: Date,
  reason?: string,
  created_at: Date;
  updated_at: Date;
}

const paymentSchema = new Schema<IPayment>({
  id: { type: String },
  amount: { type: Number },
  status: { type: String },
  razorPay_payment_id: { type: String },
  price_id: { type: String },
  user_email: { type: String, required: true },
  captured_at: { type: Date },
  failed_at: { type: Date },
  reason: { type: String },
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

export const Payment = models.Payment || model<IPayment>('Payment', paymentSchema);
