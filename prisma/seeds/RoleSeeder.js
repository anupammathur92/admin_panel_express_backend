import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const ROLES = [{
    role_name : 'admin'
  }]

export async function seedRole() {
  for(let i=0;i<ROLES.length;i++){
    const role = await prisma.roles.create({
      data: {
        role_name: ROLES[i].role_name
      }
    });
  }
}

seedRole().then(()=>{
  console.log("Role seeder completed");  
}).catch((e) => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});