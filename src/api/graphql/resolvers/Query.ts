import { userService } from '../../services/userServices';

interface pageArgs {
  page: number;  
  limit: number; 
}

interface UserArgs {
  id: string; 
}

const Query = {
    users: async (_: any, { page, limit }: pageArgs) => {
        return userService.getUsers({ page, limit });
      },
  user: async (_: any, { id }: UserArgs) => {
    return userService.getUserById(id);
  },

};

export default Query;
