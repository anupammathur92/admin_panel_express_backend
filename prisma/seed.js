import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { 
	seedUser, 
	seedCategory 
} from './seeds/index.js';