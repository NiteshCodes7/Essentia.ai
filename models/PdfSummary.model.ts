import { Schema, model, Document, Types } from 'mongoose';

export interface IPdfSummary extends Document {
  user_id: Types.ObjectId;
  original_file_url?: string;
  summary_text?: string;
  status?: string;
  title?: string;
  file_name?: string;
  created_at: Date;
  updated_at: Date;
}

const pdfSummarySchema = new Schema<IPdfSummary>({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  original_file_url: { type: String },
  summary_text: { type: String },
  status: { type: String },
  title: { type: String },
  file_name: { type: String }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

export const PdfSummary = model<IPdfSummary>('PdfSummary', pdfSummarySchema);
