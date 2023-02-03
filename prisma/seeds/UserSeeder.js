import md5 from 'md5';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const USERS = [{
    name : 'test project',
    email : 'a@yopmail.com',
    password : md5('1234'),
    role_id : 1
  }]

export async function seedUser() {
  for(let i=0;i<USERS.length;i++){
    const user = await prisma.users.create({
      data: {
        name: USERS[i].name,
        email: USERS[i].email,
        password : USERS[i].password,
        role_id : USERS[i].role_id
      }
    });
  }
}

seedUser().then(()=>{
  console.log("User seeder completed");  
}).catch((e) => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});