import { Schema, model, models } from 'mongoose'

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  companyName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  department: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['Admin', 'Student', 'Visitor']
  },
  // uniqueID: {
  //   type: String,
  //   required: true
  // }
}, {
  timestamps: true,
});
const User = models.User || model('User', userSchema);

export default User