import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface UserData {
  name: string;
  email: string;
  password: string;
}

interface AuthenticateParams {
  email: string;
  password: string;
}

interface GetUsersArgs {
    page?: number;
    limit?: number;
  }

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
};
