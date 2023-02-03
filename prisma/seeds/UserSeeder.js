import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const USERS = [{
    name : 'A',
    age : "22",
    email : 'a@yopmail.com',
    password : '',
    bankName : '',
    bankAccNo : '',
    bankIfsc : '',
    bankBal : ''
  },{
    name : 'B',
    age : "24",
    email : 'b@yopmail.com',
    password : '',
    bankName : '',
    bankAccNo : '',
    bankIfsc : '',
    bankBal : ''
  },{
    name : 'C',
    age : "26",
    email : 'c@yopmail.com',
    password : '',
    bankName : '',
    bankAccNo : '',
    bankIfsc : '',
    bankBal : ''
  },{
    name : 'D',
    age : "28",
    email : 'd@yopmail.com',
    password : '',
    bankName : '',
    bankAccNo : '',
    bankIfsc : '',
    bankBal : ''
}]

export async function seedUser() {
  for(let i=0;i<USERS.length;i++){
    const user = await prisma.user.create({
      data: {
        name: USERS[i].name,
        age: USERS[i].age,
        email: USERS[i].email,
        password : '',
        bankName : '',
        bankAccNo : '',
        bankIfsc : '',
        bankBal : ''
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