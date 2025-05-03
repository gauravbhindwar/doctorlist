import mongoose from 'mongoose';

const DoctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  specialization: {
    type: String,
    required: true,
    trim: true
  },
  experience: {
    type: Number,
    required: true
  },
  education: {
    type: String,
    required: true
  },
  clinicName: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  fees: {
    type: Number,
    required: true
  },
  profileImage: {
    type: String,
    default: ''
  },
  isOnline: {
    type: Boolean,
    default: true
  },
  offersVisit: {
    type: Boolean,
    default: false
  },
  visitFees: {
    type: Number,
    default: 0
  },
  languages: [{
    type: String,
    trim: true
  }],
  rating: {
    type: Number,
    default: 4.5,
    min: 1,
    max: 5
  },
  cashback: {
    type: Number,
    default: 0
  },
  availability: {
    type: String,
    default: 'Available in 2 minutes'
  }
}, {
  timestamps: true
});

// Check if the model already exists to prevent overwriting
export default mongoose.models.Doctor || mongoose.model('Doctor', DoctorSchema);