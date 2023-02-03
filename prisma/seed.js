import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import {
	seedRole,
	seedUser
} from './seeds/index.js';