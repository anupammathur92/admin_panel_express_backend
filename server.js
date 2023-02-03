import dotenv from 'dotenv';
import express from 'express';
import { PrismaClient } from "@prisma/client";
import pkg from 'nexus';
import path from 'path';
const { objectType, queryType, extendType, inputObjectType, nullable, nonNull, makeSchema, declarativeWrappingPlugin } = pkg;
import { ApolloServer } from 'apollo-server-express';
import passport from 'passport';
import LocalStrategy from 'passport-local';

dotenv.config();

const port = process.env.PORT || 9000;
const prisma = new PrismaClient();
const app = express();
app.use(passport.initialize());

function createContext({ req }) {
  return {
    prisma,
    req,
  };
}

const User = objectType({
  name: 'User',
  definition(table) {
    table.nonNull.int('id');
    table.nonNull.string('name');
    table.nonNull.string('email');
    table.nonNull.string('age');
    table.nonNull.string('password');
    table.nonNull.string('bankName');
    table.nonNull.string('bankAccNo');
    table.nonNull.string('bankIfsc');
    table.nonNull.string('bankBal');
  },
});

const Category = objectType({
  name: 'Category',
  definition(table) {
    table.nonNull.int('id');
    table.nonNull.string('catName');
  },
});

const OutputResponse = objectType({
  name: 'OutputResponse',
  definition(t) {
    t.nonNull.string('msg');
    t.nonNull.string('status');
  },
});

const CheckLoginResponse = objectType({
  name: 'CheckLoginResponse',
  definition(t) {
    t.nonNull.string('msg');
    t.nonNull.string('status');
    t.nonNull.string('name');
  },
});

const checkLoginInput = inputObjectType({
  name: 'CheckLoginInput',
  definition(t) {
    t.nonNull.string('email');
    t.nonNull.string('password');
  }
});

const Query = queryType({
  definition(t) {
    t.list.field('cats', {
      type: 'Category',
      nullable: true,
      resolve: async (parent, args, ctx) => {
        return await ctx.prisma.category.findMany({
          orderBy: [
            {
              id: 'desc',
            },
          ]
        });
      },
    })
    t.list.field('users', {
      type: 'User',
      nullable: true,
      resolve: async (parent, args, ctx) => {
        return await ctx.prisma.user.findMany({
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
        const userDetails = await ctx.prisma.user.findFirst({
          where:{
            email: args.input.email,
            password:args.input.password
          }
        });

        //console.log("USER_DETAILS: ",JSON.stringify(userDetails));

        if(userDetails===null){
          return{
            msg : 'fail',
            status: 'false',
            name : ''
          }          
        }

        return{
          msg : 'success',
          status: 'true',
          name : userDetails.name
        }
      },
    })
  }
});

const createCategoryInput = inputObjectType({
  name: 'CreateCategoryInput',
  definition(t) {
    t.nonNull.string('catName');
  }
});

const deleteInput = inputObjectType({
  name: 'deleteInput',
  definition(t) {
    t.nonNull.int('id');
  }
});

const createUserInput = inputObjectType({
  name: 'CreateUserInput',
  definition(t) {
    t.nonNull.string('name');
    t.nonNull.string('email');
    t.nonNull.string('age');
    t.nonNull.string('password');
    t.nonNull.string('bankName');
    t.nonNull.string('bankAccNo');
    t.nonNull.string('bankIfsc');
    t.nonNull.string('bankBal');
  }
});

const CreateCategoryMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createCategory', {
      type: 'OutputResponse',
      args: {
        input: nullable(createCategoryInput),
      },
      resolve: async(parent, args, ctx) => {
          console.log("ARGS: ",JSON.stringify(args));
          const categoryDetails = await ctx.prisma.category.create({
            data : {
              catName : args.input.catName
            }
          });
          
          return {
            msg : 'Category successfully created',
            status : '200'
          }
      },
    })
  },
});

const CreateUserMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createUser', {
      type: 'OutputResponse',
      args: {
        input: nullable(createUserInput),
      },
      resolve: async(parent, args, ctx) => {
          console.log("USER_ARGS: ",JSON.stringify(args));
          const userDetails = await ctx.prisma.user.create({
            data : {
              name : args.input.name,
              email : args.input.email,
              age : args.input.age,
              password : args.input.password,
              bankName : args.input.bankName,
              bankAccNo: args.input.bankAccNo,
              bankIfsc : args.input.bankIfsc,
              bankBal  : args.input.bankBal
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

const DeleteCategoryMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("deleteCategory", {
      type: "OutputResponse",
      args: {
        input: nullable(deleteInput),
      },
      resolve: async(parent, args, ctx) =>{
        console.log("USER_ARGS: ",JSON.stringify(args));
        await ctx.prisma.category.delete({
          where: {
            id: args.input.id,
          },
        });
        return {
          msg : 'Category successfully deleted',
          status : '200'
        }
      },
    });
  },
});

const DeleteUserMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("deleteUser", {
      type: "OutputResponse",
      args: {
        input: nullable(deleteInput),
      },
      resolve: async(parent, args, ctx) =>{
        console.log("USER_ARGS: ",JSON.stringify(args));
        await ctx.prisma.user.delete({
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

const schema = makeSchema({
  types: [Category,User,OutputResponse,CheckLoginResponse,Query,CreateCategoryMutation,CreateUserMutation,DeleteCategoryMutation,DeleteUserMutation],
  plugins: [declarativeWrappingPlugin()],
  shouldGenerateArtifacts: true,
  outputs: {
    schema: path.resolve('./') + '/schema.graphql',
    typegen: path.resolve('./') + '/generated/nexus.ts',
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
});

const server = new ApolloServer({
  schema,
  context: createContext
});

const apolloPath = '/graphql';
passport.use(new LocalStrategy(
  function(username, password, done) {
    const userDetails = prisma.user.findFirst({
      where:{
        email : 'a@gmail.com'
      }
    });

    if (!userDetails) { return done(null, false, { message: 'User not found.' }); }
    return done(null, user);
  }
));

app.get("/failureUrl",function(req,res){
  res.send("Un-authorized access");
});

app.use(apolloPath, passport.authenticate('local',{ failureRedirect: '/failureUrl' }));

await server.start();
server.applyMiddleware({ app, apolloPath });

app.listen(port, () => console.info(`Server started on port ${port}`));