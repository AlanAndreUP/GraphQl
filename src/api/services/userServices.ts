import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface UserData {
  name: string;
  email: string;
  password: string;
}
interface UserData {
  name: string;
  email: string;
  password: string;
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
    // agrega lo demas papu
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

const updateUser = async ({ id, update }: UpdateUserArgs) => {
  const user = await User.findByIdAndUpdate(id, update, { new: true });
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
  const { name, email, password } = userData;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword });
  const result = await User.create(user);
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

};
