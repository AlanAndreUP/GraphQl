import { userService } from '../../services/userServices';

interface pageArgs {
  page: number;  
  limit: number; 
}

interface UserArgs {
  id: string; 
}

const Query = {
  users: async (paren:any, { page, limit }: pageArgs, context:any) => {
    if (!context.user) {
      throw new Error("Autenticación requerida.");
    }
    return userService.getUsers({ page, limit });
  },
  user: async (parent:any, { id }: UserArgs, context:any) => {
    if (!context.user) {
      throw new Error("Autenticación requerida.");
    }
    return userService.getUserById(id);
  },
};

export default Query;
