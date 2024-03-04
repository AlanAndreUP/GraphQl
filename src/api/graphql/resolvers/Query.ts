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
  searchUsers: async (parent: any, { searchTerm }: { searchTerm: string }, context: any) => {
    if (!context.user) {
      throw new Error("Autenticación requerida.");
    }
    return userService.searchUsersByName({searchTerm});
  },

  usersWithFilters: async (parent: any, role: string, context: any) => {
    if (!context.user) {
      throw new Error("Autenticación requerida.");
    }
    return userService.getUsersByRole({role});
  },
  totalUserCount: async (parent: any, args: any, context: any) => {
    if (!context.user) {
      throw new Error("Autenticación requerida.");
    }
    return userService.getTotalUserCount();
  },
  
  
  
  
};

export default Query;
