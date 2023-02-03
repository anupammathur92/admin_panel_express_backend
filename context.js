import all from "@prisma/client";
const { PrismaClient } = all;
const prisma = new PrismaClient();

/**
 * create the context for apollo server
 * @param {object} express request.
 * @return {object} object containing prisma clinet, express request
 * appSecret and price matrix in case user is signed in
 */
function createContext({ req }) {
  return {
    prisma,
    req,
  };
}

export default createContext;
