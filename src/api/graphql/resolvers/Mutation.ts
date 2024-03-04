import { userService } from '../../services/userServices';


interface RegisterUserArgs {
  user: {
    name: string;
    email: string;
    password: string;
  };
}
interface UpdateUserArgs {
  id: string;
  update: {
    name?: string;
    email?: string;
    // agrega lo demas papu
  };
}

interface AuthenticateParams {
    email: string;
    password: string;
  }

const Mutation = {
  registerUser: async (_: any, { user }: RegisterUserArgs) => {
    return userService.createUser(user);
  },
  loginUser: async (_: any, { email, password }: AuthenticateParams) => {
    return userService.authenticateUser({email,password});
  },
  updateUser: async (parent: any, { id, name, email }: any, context: any) => {
    if (!context.user) {
      throw new Error("Autenticación requerida.");
    }
 
    return userService.updateUser({ id, update: { name, email } });
  },
  
  changeUserPassword: async (_: any, { userId, oldPassword, newPassword }: { userId: string, oldPassword: string, newPassword: string }) => {
    return userService.changePassword({userId, oldPassword, newPassword});
  },
  changeUserEmail: async (_: any, { userId, oldEmail, newEmail }: { userId: string, oldEmail: string, newEmail: string }) => {
    return userService.emailPassword({userId, oldEmail, newEmail});
  },
  deleteUser: async (_: any, { userId }: { userId: string }) => {
    return userService.deleteUser(userId);
  },
  

};

export default Mutation;
