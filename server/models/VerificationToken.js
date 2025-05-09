import mongoose from 'mongoose';

const verificationTokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 3600 }, // Expira en 1 hora
});

const VerificationToken = mongoose.model('VerificationToken', verificationTokenSchema);

export default VerificationToken;