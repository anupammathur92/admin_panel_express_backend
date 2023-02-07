import dotenv from 'dotenv';
import express from 'express';
import { PrismaClient } from "@prisma/client";
import { ApolloServer } from 'apollo-server-express';
import passport from 'passport';
import cors from 'cors';
import LocalStrategy from 'passport-local';
import schema from './schema.js';
import createContext from './context.js';

dotenv.config();

const port = process.env.PORT || 9000;
const prisma = new PrismaClient();
const app = express();
app.use(cors({
    origin: '*'
}));
app.use(passport.initialize());

const server = new ApolloServer({
  schema,
  context: createContext
});

const apolloPath = '/graphql';
passport.use(new LocalStrategy(
  function(username, password, done) {
    const userDetails = prisma.users.findFirst({
      where:{
        email : 'a@yopmail.com'
      }
    });

    if (!userDetails) { return done(null, false, { message: 'User not found.' }); }
    return done(null, user);
  }
));

app.get("/failureUrl",function(req,res){
  res.send("Un-authorized access");
});

//app.use(apolloPath, passport.authenticate('local',{ failureRedirect: '/failureUrl' }));

await server.start();
server.applyMiddleware({ app, apolloPath });

app.listen(port, () => console.info(`Server started on port ${port}`));