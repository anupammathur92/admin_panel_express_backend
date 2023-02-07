import md5 from 'md5';
import pkg from 'nexus';
const { queryType, nullable } = pkg;

import { checkUserDetailInput, User, CheckLoginResponse, checkLoginInput } from '../datatypes/index.js';

export const Query = queryType({
  definition(t) {
    t.field('getUserById', {
      type: 'User',
      args: {
        input: nullable(checkUserDetailInput),
      },
      resolve: async (parent, args, ctx) => {
        return await ctx.prisma.users.findFirst({
          where : {
            role_id : 2,
            id : args.input.id
          }
        });
      },
    })
    t.list.field('users', {
      type: 'User',
      nullable: true,
      resolve: async (parent, args, ctx) => {
        return await ctx.prisma.users.findMany({
          where : {
            role_id : 2
          },
          orderBy: [
            {
              id: 'desc',
            },
          ]
        });
      },
    })
    t.field('checkLogin', {
      type: 'CheckLoginResponse',
      args: {
        input: nullable(checkLoginInput),
      },
      resolve: async (parent, args, ctx) => {
        const userDetails = await ctx.prisma.users.findFirst({
          where:{
            email: args.input.email,
            password: md5(args.input.password),
            role_id : 2
          }
        });

        //console.log("USER_DETAILS: ",JSON.stringify(userDetails));

        if(userDetails===null){
          return{
            msg : 'Invalid Login Credentials',
            status: false,
          }
        }

        return {
          msg : 'Login Successful',
          status: true
        }
      },
    })
  }
});