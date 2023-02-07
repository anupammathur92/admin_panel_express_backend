import pkg from 'nexus';
const { extendType, nullable } = pkg;

import { createUserInput, updateUserInput, deleteInput } from '../datatypes/index.js';

export const CreateUserMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createUser', {
      type: 'OutputResponse',
      args: {
        input: nullable(createUserInput),
      },
      resolve: async(parent, args, ctx) => {
          console.log("USER_ARGS: ",JSON.stringify(args));
          const userDetails = await ctx.prisma.users.create({
            data : {
              name : args.input.name,
              email : args.input.email,
              role_id : 2,
              password : md5(args.input.password)
            }
          });
          return {
            msg : 'User successfully created',
            status : '200'
          }
      },
    })
  },
});

export const UpdateUserMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('updateUser', {
      type: 'OutputResponse',
      args: {
        input: nullable(updateUserInput),
      },
      resolve: async(parent, args, ctx) => {
          console.log("USER_ARGS: ",JSON.stringify(args));
          const userDetails = await ctx.prisma.users.update({
            where: {
              id: args.input.id
            },
            data : {
              name : args.input.name
            }
          });
          return {
            msg : 'User successfully updated',
            status : '200'
          }
      },
    })
  },
});

export const DeleteUserMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("deleteUser", {
      type: "OutputResponse",
      args: {
        input: nullable(deleteInput),
      },
      resolve: async(parent, args, ctx) =>{
        console.log("USER_ARGS: ",JSON.stringify(args));
        await ctx.prisma.users.delete({
          where: {
            id: args.input.id,
          },
        });
        return {
          msg : 'User successfully deleted',
          status : '200'
        }
      },
    });
  },
});