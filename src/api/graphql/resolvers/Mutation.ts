import { userService } from '../../services/userServices';


interface RegisterUserArgs {
  user: {
    name: string;
    email: string;
    password: string;
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

};

export default Mutation;
