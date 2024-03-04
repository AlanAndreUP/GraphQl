import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import signale from 'signale';

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
  page?: number;
  limit?: number;
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
      const response = await fetch(webhooksUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      })
      if(response.ok){
          signale.success("Data enviada al webhook usuario actualizado");
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
  if (!isMatch) {
    throw new Error('Old password does not match');
  }
  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();
  return user;
};
const emailPassword = async ({ userId, oldEmail, newEmail }: ChangeEmailArgs) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  const isMatch = await bcrypt.compare(oldEmail, user.email);
  if (!isMatch) {
    throw new Error('Old password does not match');
  }
  user.password = await bcrypt.hash(newEmail, 10);
  await user.save();
  return user;
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

const getUsersByRole = async ({ role }: GetUsersByRoleArgs) => {
  return User.find({ role });
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
  }
  else{
    signale.warn("No se encontro el usuario");
  }
  return user;
}

const getEventsWebhook = async (WebhookDetails: WebhookDetails) => {
  const events = await User.find({
    webhooksDetails: {
      $or: [
        { url: WebhookDetails.url },
        { eventName: WebhookDetails.eventName }
      ]
    }
  });
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
