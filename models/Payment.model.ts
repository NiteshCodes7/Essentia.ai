import { Schema, model, Document, models, Types } from 'mongoose';
import { boolean } from 'zod';

export interface IPayment extends Document {
  subscription_id?: string;
  user_id: Types.ObjectId;
  plan_id?: string;
  type?: string;
  amount?: number;
  currency?: string;
  status?: string;
  isNotCancelled?: boolean;
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
  subscription_id: { type: String },
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  plan_id: { type: String },
  type: { type: String },
  amount: { type: Number },
  currency: { type: String },
  status: { type: String },
  isNotCancelled: { type: Boolean, default: true},
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
