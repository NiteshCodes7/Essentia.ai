import { Schema, model, Document, Types, models } from 'mongoose';

export interface IPdfSummary extends Document {
  user_id: Types.ObjectId;
  original_file_url?: string;
  summary_text?: string;
  status?: string;
  title?: string;
  file_name?: string;
  word_count?: number;
  created_at: Date;
  updated_at: Date;
}

const pdfSummarySchema = new Schema<IPdfSummary>({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  original_file_url: { type: String },
  summary_text: { type: String },
  status: { type: String },
  title: { type: String },
  file_name: { type: String },
  word_count: { type: Number },
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

export const PdfSummary = models.PdfSummary || model<IPdfSummary>('PdfSummary', pdfSummarySchema);

// if (model is already defined) {
//    use the existing one ✅
// } else {
//    define the model now ❗
// }

// | Code                                    | Meaning                                                            |    |                                                   |
// | --------------------------------------- | ------------------------------------------------------------------ | -- | ------------------------------------------------- |
// | `models.PdfSummary`                     | Checks if the model already exists in the Mongoose global registry |    |                                                   |
// | `model('PdfSummary', pdfSummarySchema)` | Only runs if it hasn't been defined yet                            |    |                                                   |
// | \`                                      |                                                                    | \` | Prevents redefinition and the OverwriteModelError |
