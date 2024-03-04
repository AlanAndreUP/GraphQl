import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import signale from 'signale';
import axios from 'axios';

interface UserData {
  name: string;
  email: string;
  password: string;
  role: string;
}
interface AuthenticateParams {
  email: string;
  password: string;
}

interface UpdateUserArgs {
  id: string;
  update: {
    name?: string;
    email?: string;    
    password?: string;
    role?: string;
  };
}

interface ChangePasswordArgs {
  userId: string;
  oldPassword: string;
  newPassword: string;
}
interface ChangeEmailArgs {
  userId: string;
  oldEmail: string;
  newEmail: string;
}
interface AuthenticateParams {
  email: string;
  password: string;
}

interface SearchUsersArgs {
  searchTerm: string;
}
interface GetUsersByRoleArgs {
  role: string;
}
interface GetUsersArgs {
  page: number;
  limit: number;
}

interface WebhookDetails {
  url?: string;
  eventName?: string;
}

async function sendWebhookDataUser(user:any, eventName?:string): Promise<void>{
  let webhooksUrl = "";
  if(user){
    for(let i = 0; i < user.webhooksDetails.length; i++){
      if(user.webhooksDetails[i].eventName === eventName){
        webhooksUrl = user?.webhooksDetails[i]?.url || "";
      }
    }
    if(webhooksUrl != null && webhooksUrl != "" && webhooksUrl.length > 0){
      console.log("entramos")
      try {
        await axios.post(webhooksUrl, { content: JSON.stringify(user) });
        console.log("Mensaje enviado al webhook de Discord");
      } catch (error) {
        console.error("Error al enviar el mensaje al webhook de Discord:", error);
      }
    }
  }  
}

const updateUser = async ({ id, update }: UpdateUserArgs) => {
  const user = await User.findByIdAndUpdate(id, update, { new: true });
  await sendWebhookDataUser(user, "updatedUser");
  return user;
};

const deleteUser = async (id: string) => {
  const user = await User.findByIdAndDelete(id);
  return user ? true : false;
};

const changePassword = async ({ userId, oldPassword, newPassword }: ChangePasswordArgs) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (isMatch) {
    throw new Error('Old password does not match');
  }
  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();
  return true;
};
const emailPassword = async ({ userId, oldEmail, newEmail }: ChangeEmailArgs) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  const isMatch = await bcrypt.compare(oldEmail, user.email);
  if (isMatch) {
    throw new Error('Old email does not match');
  }
  user.email = newEmail;
  await user.save();
  return true;
};

const searchUsersByName = async ({ searchTerm }: SearchUsersArgs) => {
  const regex = new RegExp(searchTerm, 'i');
  return User.find({
    $or: [
      { name: regex },
      { email: regex }
    ]
  });
};

const getTotalUserCount = async () => {
  return User.countDocuments();
};

const getUsersByRole = async (role:string) => {
  const regex = new RegExp(role, 'i');
  return User.find({
    $or: [
      { role: regex }
      
    ]
  });
};


const createUser = async (userData: UserData) => {
  const { name, email, password, role } = userData;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword, role });
  await sendWebhookDataUser(user, "newCreatedUser");
  await user.save();
  return user;
};

const authenticateUser = async ({ email, password }: AuthenticateParams) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User not found');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }
  const token = jwt.sign({ userId: user.id }, "token", { expiresIn: '1h' });
  return token;
};

const getUsers = async ({ page = 1, limit = 10 }: { page: number; limit: number }) => {
  const users = await User.find()
    .limit(limit)
    .skip((page - 1) * limit)
    .exec();
  const count = await User.countDocuments();
  return {
    users,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
  };
};
const getUserById = async (id: string) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

const addEventWebhook = async (id: string, WebhookDetails: WebhookDetails) => {
  let user = await User.findById(id);
  if (user) {
    user.webhooksDetails.push({
      url: WebhookDetails.url,
      eventName: WebhookDetails.eventName
    })
    user = await User.findByIdAndUpdate(id, user, { new: true });
    signale.success("Webhook agregado al usuario");
    return user;
  }
  else{
    signale.warn("No se encontro el usuario");
  }
  return user;
}

const getEventsWebhook = async (pageArgs: GetUsersArgs, WebhookDetails: WebhookDetails) => {
  const events = await User.find({
    $or: [
      { 'webhooksDetails.url': WebhookDetails.url },
      { 'webhooksDetails.eventName': WebhookDetails.eventName }
    ]
  })
  .limit(pageArgs.limit)
  .skip((pageArgs.page - 1) * pageArgs.limit)
  .exec();
  return events;
}

export const userService = {
  createUser,
  authenticateUser,
  getUsers,
  getUserById,
  searchUsersByName,
  getUsersByRole,
  getTotalUserCount,
  updateUser,
  deleteUser,
  changePassword,
  emailPassword,
  addEventWebhook,
  getEventsWebhook
};
