import mongoose from 'mongoose';

interface WebhookDetails{
  url: string,
  eventName: string
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  webhooksDetails: [{ 
    url: String,
    eventName: String
}]
});

const User = mongoose.model('User', userSchema);

export default User;
