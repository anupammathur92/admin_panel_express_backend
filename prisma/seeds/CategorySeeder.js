import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const CATEGORIES = [
  "CAT_ONE",
  "CAT_TWO",
  "CAT_THREE",
  "CAT_FOUR"
];

export async function seedCategory() {
  for(let i=0;i<CATEGORIES.length;i++){
    const user = await prisma.category.create({
      data: {
        catName: CATEGORIES[i]
      }
    });
  }
}

seedCategory().then(()=>{
  console.log("Category seeder completed");
}).catch((e) => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});